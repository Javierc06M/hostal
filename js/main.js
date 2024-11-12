/*  ---------------------------------------------------
    Template Name: Sona
    Description: Sona Hotel Html Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Offcanvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
   $(".hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Date Picker
	--------------------*/
    $(".date-input").datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy'
    });

    /*------------------
		Nice Select
	--------------------*/
    $("select").niceSelect();

})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const menuItems = document.querySelectorAll('.menu-item');
  
    function filterMenuItems(category) {
      menuItems.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === 'all' || category === itemCategory) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300); // Duración de la transición
        }
      });
    }
  
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Actualizar el estado activo de los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        // Filtrar los elementos del menú
        filterMenuItems(filter);
      });
    });
  
    // Inicializar con todos los elementos visibles
    filterMenuItems('all');
  });
  
  console.log('Menu filter script loaded and executed.');

  document.addEventListener('DOMContentLoaded', function() {
    const gallerySection = document.querySelector('.gallery-section');
    const galleryItems = gallerySection.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    const modalImage = modal.querySelector('.carousel-image');
    const closeBtn = modal.querySelector('.close');
    const prevBtn = modal.querySelector('.prev');
    const nextBtn = modal.querySelector('.next');
    let currentIndex = 0;
    let intervalId;

    function openModal(index) {
        currentIndex = index;
        updateModalImage();
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
        startCarousel();
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            stopCarousel();
        }, 300);
    }

    function updateModalImage() {
        modalImage.classList.remove('active');
        setTimeout(() => {
            modalImage.src = galleryItems[currentIndex].getAttribute('data-setbg');
            modalImage.alt = galleryItems[currentIndex].querySelector('.gi-text h3').textContent;
            setTimeout(() => modalImage.classList.add('active'), 50);
        }, 300);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModalImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModalImage();
    }

    function startCarousel() {
        intervalId = setInterval(nextImage, 5000); // Cambia la imagen cada 5 segundos
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', () => {
        nextImage();
        stopCarousel();
        startCarousel();
    });
    prevBtn.addEventListener('click', () => {
        prevImage();
        stopCarousel();
        startCarousel();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowRight') {
                nextImage();
                stopCarousel();
                startCarousel();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
                stopCarousel();
                startCarousel();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
});