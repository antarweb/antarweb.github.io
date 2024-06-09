        const output = document.getElementById('output');
        const actionButtons = document.getElementById('actionButtons');
        const formatOptions = {
            'image/jpeg': 'jpeg',
            'image/png': 'png',
            'image/webp': 'webp',
            'image/jpg': 'jpg'
        };
        let processedImages = [];

        function processFiles() {
            const input = document.getElementById('imageInput');
            if (input.files.length === 0) {
                alert('Please select a file to process.');
                return;
            }
            const width = document.getElementById('width').value;
            const height = document.getElementById('height').value;
            const format = document.getElementById('format').value;
            const maxSizeKB = document.getElementById('size').value;

            output.innerHTML = ''; // Clear previous output
            processedImages = [];
            actionButtons.style.display = 'none';

            const files = Array.from(input.files);
            let processedCount = 0;

            files.forEach((file, index) => {
                const callback = () => {
                    processedCount++;
                    if (processedCount === files.length) {
                        actionButtons.style.display = 'block';
                    }
                };

                if (file.type === 'application/pdf') {
                    processPDF(file, width, height, format, maxSizeKB, callback, index);
                } else {
                    processImage(file, width, height, format, maxSizeKB, callback, index);
                }
            });
        }

        function processImage(file, width, height, format, maxSizeKB, callback, index) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = width || img.width;
                    canvas.height = height || img.height;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    let quality = 1.0; // Initial quality
                    let dataUrl = canvas.toDataURL(format, quality);
                    if (maxSizeKB) {
                        const maxSizeBytes = maxSizeKB * 1024;
                        while (dataUrl.length * (3 / 4) > maxSizeBytes && quality > 0.1) {
                            quality -= 0.05;
                            dataUrl = canvas.toDataURL(format, quality);
                        }
                    }

                    const newImg = document.createElement('img');
                    newImg.src = dataUrl;
                    output.appendChild(newImg);

                    const fileSize = (dataUrl.length * (3 / 4) / 1024).toFixed(2); // in KB
                    const imgInfo = document.createElement('p');
                    imgInfo.innerHTML = `Image ${index + 1} - Size: ${fileSize} KB, Width: ${canvas.width}, Height: ${canvas.height}`;
                    output.appendChild(imgInfo);

                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `Ant Resizer - ${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.jpg`;
                    link.innerText = 'Download';
                    output.appendChild(link);
                    output.appendChild(document.createElement('br'));

                    processedImages.push({ name: link.download, dataUrl });

                    callback();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        function processPDF(file, width, height, format, maxSizeKB, callback, index) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const loadingTask = pdfjsLib.getDocument({ data: event.target.result });
                loadingTask.promise.then(pdf => {
                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        pdf.getPage(pageNum).then(page => {
                            const viewport = page.getViewport({ scale: 1.5 });
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            canvas.width = width || viewport.width;
                            canvas.height = height || viewport.height;

                            const renderContext = {
                                canvasContext: ctx,
                                viewport: viewport
                            };
                            page.render(renderContext).promise.then(() => {
                                let quality = 1.0;
                                let dataUrl = canvas.toDataURL(format, quality);
                                if (maxSizeKB) {
                                    const maxSizeBytes = maxSizeKB * 1024;
                                    while (dataUrl.length * (3 / 4) > maxSizeBytes && quality > 0.1) {
                                        quality -= 0.05;
                                        dataUrl = canvas.toDataURL(format, quality);
                                    }
                                }

                                const newImg = document.createElement('img');
                                newImg.src = dataUrl;
                                output.appendChild(newImg);

                                const fileSize = (dataUrl.length * (3 / 4) / 1024).toFixed(2); // in KB
                                const imgInfo = document.createElement('p');
                                imgInfo.innerHTML = `Image ${index + 1} - Size: ${fileSize} KB, Width: ${canvas.width}, Height: ${canvas.height}`;
                                output.appendChild(imgInfo);

                                const link = document.createElement('a');
                                link.href = dataUrl;
                                link.download = `Ant Resizer - ${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}_page_${pageNum}.jpg`;
                                link.innerText = `Download Page ${pageNum}`;
                                output.appendChild(link);
                                output.appendChild(document.createElement('br'));

                                processedImages.push({ name: link.download, dataUrl });

                                if (pageNum === pdf.numPages) {
                                    callback();
                                }
                            });
                        });
                    }
                });
            };
            reader.readAsArrayBuffer(file);
        }

        function downloadAll() {
            if (processedImages.length === 0) {
                alert('No images to download');
                return;
            }

            processedImages.forEach(image => {
                const link = document.createElement('a');
                link.href = image.dataUrl;
                link.download = image.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }

        function createPDF() {
            if (processedImages.length === 0) {
                alert('No images to create PDF');
                return;
            }

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            processedImages.forEach((image, index) => {
                if (index > 0) {
                    pdf.addPage();
                }
                pdf.addImage(image.dataUrl, 'JPEG', 10, 10, 180, 160); // Example dimensions
            });

            pdf.save('Ant_Resizer_PDF_' + new Date().toISOString().slice(0, 19).replace(/:/g, "-") + '.pdf');
        }

        function resetForm() {
            document.getElementById('imageInput').value = '';
            document.getElementById('width').value = '';
            document.getElementById('height').value = '';
            document.getElementById('format').value = 'image/jpeg';
            document.getElementById('size').value = '';
            output.innerHTML = '';
            actionButtons.style.display = 'none';
            processedImages = [];
        }
