      document.addEventListener('DOMContentLoaded', function () {
            var slides = document.querySelectorAll('.slide');
            var prevBtn = document.getElementById('prevBtn');
            var playBtn = document.getElementById('playBtn');
            var stopBtn = document.getElementById('stopBtn');
            var nextBtn = document.getElementById('nextBtn');

            var currentSlide = 0;
            var slideInterval;
            var playing = false;

            initSlideshow();

            function initSlideshow() {
                var savedSlide = getCookie('currentSlide');
                if (savedSlide !== '') {
                    currentSlide = parseInt(savedSlide);
                }

                showSlide(currentSlide);

                updateButtons();
            }

            function showSlide(index) {
                for (var i = 0; i < slides.length; i++) {
                    slides[i].classList.remove('active');
                }

                slides[index].classList.add('active');

                setCookie('currentSlide', index, 7);
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            }

            function startSlideshow() {
                playing = true;
                slideInterval = setInterval(nextSlide, 2000);
                updateButtons();
            }

            function stopSlideshow() {
                playing = false;
                clearInterval(slideInterval);
                updateButtons();
            }

            function updateButtons() {
                playBtn.disabled = playing;
                stopBtn.disabled = !playing;
            }

            function setCookie(name, value, days) {
                var expires = '';
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = '; expires=' + date.toUTCString();
                }
                document.cookie = name + '=' + (value || '') + expires + '; path=/';
            }

            function getCookie(name) {
                var nameEQ = name + '=';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return '';
            }

            prevBtn.addEventListener('click', function () {
                stopSlideshow();
                prevSlide();
            });

            nextBtn.addEventListener('click', function () {
                stopSlideshow();
                nextSlide();
            });

            playBtn.addEventListener('click', startSlideshow);
            stopBtn.addEventListener('click', stopSlideshow);
        });