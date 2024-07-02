    function toggleMenu() {
        const navbar = document.querySelector('.navbar ul');
        const menuIcon = document.querySelector('.menu-icon');
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('change');
    }

    // Close navbar on outside click
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar ul');
        const menuIcon = document.querySelector('.menu-icon');
        const isClickInsideNavbar = navbar.contains(event.target);
        const isClickInsideMenuIcon = menuIcon.contains(event.target);

        if (!isClickInsideNavbar && !isClickInsideMenuIcon) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('change');
        }
    });

    // Function to fetch and display additional links
    async function loadLinks() {
        try {
            const response = await fetch('https://antarweb.github.io/files/links.html');
            const data = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const links = Array.from(doc.querySelectorAll('a'));

            // Shuffle the links array
            for (let i = links.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [links[i], links[j]] = [links[j], links[i]];
            }

            // Insert links into the header dropdown
            const headerDropdownContent = document.querySelector('.dropdown-content');
            links.forEach(link => headerDropdownContent.appendChild(link.cloneNode(true)));

            // Select 2 random links for footer left and right
            const footerLeftLink = links.pop();
            const footerRightLink = links.pop();

            // Insert these links into the footer
            document.querySelector('.footer-link-left').appendChild(footerLeftLink.cloneNode(true));
            document.querySelector('.footer-link-right').appendChild(footerRightLink.cloneNode(true));

            // Insert remaining links into the footer dropdown
            const footerDropdownContent = document.querySelector('.footer-dropdown-content');
            links.forEach(link => footerDropdownContent.appendChild(link.cloneNode(true)));

        } catch (error) {
            console.error('Error fetching links:', error);
        }
    }

    // Load links when the page is loaded
    document.addEventListener('DOMContentLoaded', loadLinks);

    document.addEventListener('DOMContentLoaded', function() {
        var mybutton = document.querySelector(".back-to-top");

        // When the user scrolls down 200px from the top of the document, show the button
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }

        // When the user clicks on the button, scroll to the top of the document
        mybutton.addEventListener('click', scrollToTop);

        function scrollToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    });
