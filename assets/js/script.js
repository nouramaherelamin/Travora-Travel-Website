/* =============================================
   TRAVEL TOUR – Shared JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------
     TOAST NOTIFICATION HELPER
     ------------------------------------------- */
  function showToast(message, type) {
    type = type || 'success';
    var container = document.querySelector('.toast-container-fixed');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container-fixed';
      document.body.appendChild(container);
    }
    var toastId = 'toast-' + Date.now();
    var bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
    var icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
    var html =
      '<div id="' + toastId + '" class="toast align-items-center text-white ' + bgClass + ' border-0 mb-2" role="alert" aria-live="assertive">' +
        '<div class="d-flex">' +
          '<div class="toast-body"><i class="bi ' + icon + ' me-2"></i>' + message + '</div>' +
          '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
        '</div>' +
      '</div>';
    container.insertAdjacentHTML('beforeend', html);
    var toastEl = document.getElementById(toastId);
    var bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', function () {
      toastEl.remove();
    });
  }

  /* -------------------------------------------
     EMAIL VALIDATION HELPER
     ------------------------------------------- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* -------------------------------------------
     CURRENCY DROPDOWN
     ------------------------------------------- */
  var iconMap = {
    USD: 'bi-currency-dollar',
    EUR: 'bi-currency-euro',
    GBP: 'bi-currency-pound',
    EGP: 'bi-currency-exchange'
  };

  var rateMap = { USD: 1, EUR: 0.92, GBP: 0.79, EGP: 30.9 };

  function applyCurrency(currency) {
    var icon = iconMap[currency] || 'bi-currency-dollar';
    document.querySelectorAll('.currency-btn').forEach(function (btn) {
      btn.innerHTML = '<i class="bi ' + icon + '"></i> ' + currency;
    });
    // Update visible prices
    var rate = rateMap[currency] || 1;
    var symbols = { USD: '$', EUR: '€', GBP: '£', EGP: 'EGP ' };
    var sym = symbols[currency] || '$';
    document.querySelectorAll('[data-price-usd]').forEach(function (el) {
  if (el.classList.contains('rs-card') || el.classList.contains('ts-card')) {
    return;
  }

  var base = parseFloat(el.dataset.priceUsd);

  if (!isNaN(base)) {
    var converted = Math.round(base * rate * 100) / 100;
    var display = (converted % 1 === 0)
      ? converted.toLocaleString()
      : converted.toFixed(2);

    el.textContent = sym + display;
  }
});
      var base = parseFloat(el.dataset.priceUsd);
      if (!isNaN(base)) {
        var converted = Math.round(base * rate * 100) / 100;
        var display = (converted % 1 === 0) ? converted.toLocaleString() : converted.toFixed(2);
        el.textContent = sym + display;
      }
    }
    });

  // Apply saved currency on page load
  var savedCurrency = localStorage.getItem('tt-currency') || 'USD';
  applyCurrency(savedCurrency);

  // Currency selection event
  document.querySelectorAll('[data-currency]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var currency = this.dataset.currency;
      localStorage.setItem('tt-currency', currency);
      applyCurrency(currency);
      showToast('Currency changed to ' + currency, 'success');
    });
  });

  /* -------------------------------------------
     NAVBAR SCROLL EFFECT
     ------------------------------------------- */
  var navbar = document.getElementById('mainNavbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* -------------------------------------------
     BACK TO TOP BUTTON
     ------------------------------------------- */
  var backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.getElementById('backToTop');
  }
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
        backToTop.style.display = 'flex';
      } else {
        backToTop.classList.remove('show');
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------
     LOGIN FORM VALIDATION
     ------------------------------------------- */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('loginEmail').value.trim();
      var password = document.getElementById('loginPassword').value.trim();
      if (!email) { showToast('Please enter your email address.', 'error'); return; }
      if (!isValidEmail(email)) { showToast('Please enter a valid email address.', 'error'); return; }
      if (!password) { showToast('Please enter your password.', 'error'); return; }
      if (password.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
      showToast('Login successful! Welcome back.', 'success');
      var modal = document.getElementById('authModal');
      if (modal) {
        var bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
      }
      loginForm.reset();
    });
  }

  /* -------------------------------------------
     REGISTER FORM VALIDATION
     ------------------------------------------- */
  var registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('registerName').value.trim();
      var email = document.getElementById('registerEmail').value.trim();
      var password = document.getElementById('registerPassword').value.trim();
      var confirm = document.getElementById('registerConfirmPassword').value.trim();
      if (!name) { showToast('Please enter your name.', 'error'); return; }
      if (!email) { showToast('Please enter your email address.', 'error'); return; }
      if (!isValidEmail(email)) { showToast('Please enter a valid email address.', 'error'); return; }
      if (!password || password.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
      if (password !== confirm) { showToast('Passwords do not match.', 'error'); return; }
      showToast('Registration successful! Welcome to Travel Tour.', 'success');
      var modal = document.getElementById('authModal');
      if (modal) {
        var bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
      }
      registerForm.reset();
    });
  }

  /* -------------------------------------------
     CONTACT FORM VALIDATION
     ------------------------------------------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      // Get fields
      var firstName = document.getElementById('firstName');
      var lastName = document.getElementById('lastName');
      var email = document.getElementById('contactEmail');
      var subject = document.getElementById('subject');
      var message = document.getElementById('message');
      var terms = document.getElementById('agreeTerms');

      // Clear previous validation
      contactForm.querySelectorAll('.form-control, .form-select, .form-check-input').forEach(function (el) {
        el.classList.remove('is-invalid');
      });

      if (firstName && !firstName.value.trim()) {
        firstName.classList.add('is-invalid');
        valid = false;
      }
      if (lastName && !lastName.value.trim()) {
        lastName.classList.add('is-invalid');
        valid = false;
      }
      if (email && (!email.value.trim() || !isValidEmail(email.value.trim()))) {
        email.classList.add('is-invalid');
        valid = false;
      }
      if (subject && !subject.value) {
        subject.classList.add('is-invalid');
        valid = false;
      }
      if (message && !message.value.trim()) {
        message.classList.add('is-invalid');
        valid = false;
      }
      if (terms && !terms.checked) {
        terms.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) {
        showToast('Please fill in all required fields correctly.', 'error');
        return;
      }

      showToast('Message sent successfully! We will get back to you within 24 hours.', 'success');
      contactForm.reset();
      contactForm.querySelectorAll('.form-control, .form-select, .form-check-input').forEach(function (el) {
        el.classList.remove('is-invalid');
      });
    });
  }

  /* -------------------------------------------
     BOOKING FORM VALIDATION
     ------------------------------------------- */
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var date = document.getElementById('bookingDate');
      var people = document.getElementById('bookingPeople');
      var name = document.getElementById('bookingName');
      var email = document.getElementById('bookingEmail');

      bookingForm.querySelectorAll('.form-control, .form-select').forEach(function (el) {
        el.classList.remove('is-invalid');
      });

      if (date && !date.value) {
        date.classList.add('is-invalid');
        valid = false;
      }
      if (people && !people.value) {
        people.classList.add('is-invalid');
        valid = false;
      }
      if (name && !name.value.trim()) {
        name.classList.add('is-invalid');
        valid = false;
      }
      if (email && (!email.value.trim() || !isValidEmail(email.value.trim()))) {
        email.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) {
        showToast('Please fill in all required booking fields.', 'error');
        return;
      }

      showToast('Booking confirmed! Check your email for details.', 'success');
      bookingForm.reset();
      bookingForm.querySelectorAll('.form-control, .form-select').forEach(function (el) {
        el.classList.remove('is-invalid');
      });
    });
  }

  /* -------------------------------------------
     NEWSLETTER FORM VALIDATION
     ------------------------------------------- */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = this.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';
      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      showToast('Newsletter subscribed successfully!', 'success');
      this.reset();
    });
  });

  /* -------------------------------------------
     BLOG COMMENT FORM VALIDATION
     ------------------------------------------- */
  var commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('commentName');
      var email = document.getElementById('commentEmail');
      var comment = document.getElementById('commentText');
      var valid = true;

      commentForm.querySelectorAll('.form-control').forEach(function (el) {
        el.classList.remove('is-invalid');
      });

      if (name && !name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
      if (email && (!email.value.trim() || !isValidEmail(email.value.trim()))) { email.classList.add('is-invalid'); valid = false; }
      if (comment && !comment.value.trim()) { comment.classList.add('is-invalid'); valid = false; }

      if (!valid) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      showToast('Comment submitted successfully!', 'success');
      commentForm.reset();
    });
  }

  /* -------------------------------------------
     MULTI-CARD CAROUSEL
     ------------------------------------------- */
  document.querySelectorAll('.multi-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.multi-carousel-track');
    var prevBtn = carousel.querySelector('.carousel-control-custom.prev');
    var nextBtn = carousel.querySelector('.carousel-control-custom.next');
    if (!track || !prevBtn || !nextBtn) return;

    var index = 0;
    var items = track.querySelectorAll('.carousel-item-custom');
    var total = items.length;
    var isFourUp = carousel.classList.contains('multi-carousel-4');

    function getVisible() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 992) return 2;
      return isFourUp ? 4 : 3;
    }

    function updateCarousel() {
      var visible = getVisible();
      var maxIndex = Math.max(0, total - visible);
      if (index > maxIndex) index = maxIndex;
      if (index < 0) index = 0;
      var percent = index * (100 / visible);
      track.style.transform = 'translateX(-' + percent + '%)';
    }

    prevBtn.addEventListener('click', function () {
      if (index > 0) { index--; updateCarousel(); }
    });
    nextBtn.addEventListener('click', function () {
      var visible = getVisible();
      if (index < total - visible) { index++; updateCarousel(); }
    });
    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    // Auto-play for Popular Tours (which doesn't have an ID, or we can just apply to all if we want, but let's apply to the first one)
    if (!carousel.id || carousel.id === 'popularToursCarousel') {
      var autoPlayInterval = setInterval(function() {
        var visible = getVisible();
        if (index < total - visible) {
          index++;
        } else {
          index = 0;
        }
        updateCarousel();
      }, 3000);

      // Pause on hover
      carousel.addEventListener('mouseenter', function() {
        clearInterval(autoPlayInterval);
      });
      carousel.addEventListener('mouseleave', function() {
        autoPlayInterval = setInterval(function() {
          var visible = getVisible();
          if (index < total - visible) {
            index++;
          } else {
            index = 0;
          }
          updateCarousel();
        }, 3000);
      });
    }
  });

  /* -------------------------------------------
     ANIMATED COUNTERS
     ------------------------------------------- */
  var counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    var observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var counter = entry.target;
          var target = parseInt(counter.getAttribute('data-target'), 10);
          var count = 0;
          var duration = 2000; // 2 seconds
          var increment = target / (duration / 16); // 60fps

          var updateCount = function() {
            count += increment;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }

  /* -------------------------------------------
     HERO SEARCH BUTTON
     ------------------------------------------- */
  var heroSearchBtn = document.getElementById('heroSearchBtn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', function () {
      var keywords = document.getElementById('searchKeywords');
      var destination = document.getElementById('searchDestination');
      var duration = document.getElementById('searchDuration');
      var url = 'pages/tour-search.html';
      var params = [];
      if (keywords && keywords.value.trim()) params.push('q=' + encodeURIComponent(keywords.value.trim()));
      if (destination && destination.value) params.push('dest=' + encodeURIComponent(destination.value));
      if (duration && duration.value) params.push('dur=' + encodeURIComponent(duration.value));
      if (params.length > 0) url += '?' + params.join('&');
      window.location.href = url;
    });
  }

  /* -------------------------------------------
     SIDEBAR SEARCH / FILTER BUTTON
     ------------------------------------------- */
  document.querySelectorAll('.sidebar-search-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Filters applied successfully!', 'success');
    });
  });

  /* -------------------------------------------
     PAGE-LEVEL SEARCH FORMS
     ------------------------------------------- */
  document.querySelectorAll('.search-page-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Search results updated!', 'success');
    });
  });

  /* -------------------------------------------
     BOOKING LINK BUTTONS
     ------------------------------------------- */
  document.querySelectorAll('.btn-book').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Redirecting to booking...', 'success');
      var href = this.getAttribute('href') || this.dataset.href;
      if (href && href !== '#') {
        setTimeout(function () { window.location.href = href; }, 500);
      }
    });
  });

  /* -------------------------------------------
     ROOM CART FUNCTIONALITY
     ------------------------------------------- */
  var roomCartForm = document.getElementById('roomCartForm');
  if (roomCartForm) {
    roomCartForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var guestName = document.getElementById('guestName');
      var guestEmail = document.getElementById('guestEmail');
      if (guestName && !guestName.value.trim()) { showToast('Please enter guest name.', 'error'); return; }
      if (guestEmail && (!guestEmail.value.trim() || !isValidEmail(guestEmail.value.trim()))) {
        showToast('Please enter a valid email.', 'error'); return;
      }
      showToast('Booking confirmed! Check your email for details.', 'success');
      roomCartForm.reset();
    });
  }
  

  /* -------------------------------------------
     BLOG SIDEBAR SEARCH
     ------------------------------------------- */
  var blogSearchBtn = document.querySelector('.sidebar-card .input-group .btn');
  if (blogSearchBtn) {
    blogSearchBtn.addEventListener('click', function () {
      var input = this.closest('.input-group').querySelector('input');
      if (input && input.value.trim()) {
        showToast('Searching for "' + input.value.trim() + '"...', 'success');
      } else {
        showToast('Please enter a search term.', 'error');
      }
    });
  }

  /* -------------------------------------------
     BLOG PAGINATION
     ------------------------------------------- */
  var pagination = document.querySelector('.blog-pagination');
  if (pagination) {
    pagination.querySelectorAll('.page-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        // Update active state
        pagination.querySelectorAll('.page-item').forEach(function (item) {
          item.classList.remove('active');
          item.classList.remove('disabled');
        });
        this.closest('.page-item').classList.add('active');
        // Scroll to top of blog section
        var blogSection = document.querySelector('.col-lg-8');
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        showToast('Page updated', 'success');
      });
    });
  }

  /* -------------------------------------------
     BLOG DETAILS – DYNAMIC CONTENT LOADER
     ------------------------------------------- */
  var blogDetailContainer = document.getElementById('blogDetailContent');
  if (blogDetailContainer) {
    // Blog posts data
    var blogPosts = [
      {
        id: 1,
        title: 'The Ultimate Guide to Vienna and Hallstatt: 6 Days of Magic',
        date: 'August 20, 2024',
        author: 'Sarah Johnson',
        category: 'Destinations',
        image: '../assets/Images/TT Austria 6Days in Vienna Hallstatt.png',
        extraImg: '../assets/Images/Destinations Page Austria 6 Days in Vienna Hallstatt3.jpg',
        content: '<p>Austria is a country that seamlessly blends imperial grandeur with natural beauty. Our six-day journey through Vienna and Hallstatt revealed a world of stunning architecture, rich musical heritage, and landscapes that look like they belong in a fairy tale.</p>' +
          '<h3>Day 1-3: Vienna – The Imperial Capital</h3>' +
          '<p>Vienna welcomed us with its wide boulevards and magnificent palaces. The Schönbrunn Palace, a UNESCO World Heritage site, was our first stop. Walking through its 1,441 rooms (well, the 40 that are open to the public), we were transported back to the Habsburg era. The palace gardens alone could occupy an entire afternoon, with their perfectly manicured hedges, fountains, and the Gloriette hilltop structure offering panoramic views of the city.</p>' +
          '<p>The Belvedere Palace, home to Gustav Klimt\'s famous "The Kiss," was another highlight. The Upper Belvedere\'s collection of Austrian art is simply world-class, and the palace gardens provide one of the best views of Vienna\'s skyline.</p>' +
          '<blockquote class="blog-quote"><i class="bi bi-quote"></i><p>"Vienna is a city that makes you want to slow down, sit in a coffee house, and simply watch the world go by while sipping a melange."</p></blockquote>' +
          '<h3>Day 4-6: Hallstatt – The Fairy Tale Village</h3>' +
          '<p>Leaving Vienna behind, we took a scenic train ride to Hallstatt, a village so beautiful it was designated a UNESCO World Heritage site. Nestled between the towering Dachstein mountains and the mirror-like Hallstätter See, this tiny village of fewer than 800 residents is one of the most photographed places in Europe.</p>' +
          '<ul><li>Visit the Salzwelten – the world\'s oldest salt mine</li><li>Take the Skywalk viewing platform for breathtaking panoramic views</li><li>Explore the charming lakeside market square</li><li>Hike the scenic trails around the Dachstein mountains</li><li>Enjoy fresh fish from the lake at a local restaurant</li></ul>' +
          '<p>Hallstatt in the early morning, before the day-trippers arrive, is pure magic. The mist rising from the lake, the sound of church bells echoing through the valley, and the reflection of pastel-colored houses in the still water – it\'s an experience that stays with you forever.</p>',
        tags: ['Europe', 'Austria', 'City Tour', 'Adventure']
      },
      {
        id: 2,
        title: 'Paris in 6 Days: How to Experience the City of Light Like a Local',
        date: 'August 14, 2024',
        author: 'Michael Chen',
        category: 'Travel Tips',
        image: '../assets/Images/Tour Pais Eiffel Tower Notre Dame Cath.jpg',
        extraImg: '../assets/Images/Destinations Page Pais Eiffel Tower Notre Dame Cath2.jpg',
        content: '<p>Paris is more than just the Eiffel Tower and the Louvre. While these iconic landmarks deserve their fame, the true magic of Paris lies in its neighborhoods, hidden courtyards, and the everyday rituals of Parisian life. Our six-day itinerary was designed to help you experience both the must-see attractions and the secret gems that most tourists never discover.</p>' +
          '<h3>The Art of the Parisian Morning</h3>' +
          '<p>Every morning in Paris should begin at a local boulangerie. Forget the hotel breakfast buffet – instead, join the queue at a neighborhood bakery for a freshly baked croissant and a café crème. The scent of butter and warm bread is the quintessential Parisian wake-up call.</p>' +
          '<blockquote class="blog-quote"><i class="bi bi-quote"></i><p>"The best way to see Paris is to get lost in it. Put away the map, follow a side street, and let the city reveal itself to you."</p></blockquote>' +
          '<h3>Beyond the Tourist Trail</h3>' +
          '<p>While the Eiffel Tower is magnificent (and yes, you should see it), we found the most memorable experiences in places like the Marais district, with its independent boutiques and falafel shops, and the Canal Saint-Martin, where locals gather for picnics along the water.</p>' +
          '<ul><li>Explore Montmartre at sunrise before the crowds</li><li>Visit the Musée de l\'Orangerie for Monet\'s Water Lilies</li><li>Wander through the covered passages of the 2nd arrondissement</li><li>Take a day trip to the Palace of Versailles</li><li>Enjoy sunset from the Trocadéro Gardens</li></ul>' +
          '<p>Paris rewards those who take the time to explore beyond the obvious. Every arrondissement has its own personality, and some of the best meals we had were in tiny restaurants with no English menu and just a handful of tables.</p>',
        tags: ['Europe', 'City Tour', 'Luxury', 'Budget Travel']
      },
      {
        id: 3,
        title: 'Dubai: 5 Days of Luxury, Adventure, and Stunning Architecture',
        date: 'August 7, 2024',
        author: 'Emma Williams',
        category: 'Destinations',
        image: '../assets/Images/Tour Dubai All Stunning Places.jpg',
        extraImg: '../assets/Images/Destinations Page Brazil Rio de Janeiro1.jpg',
        content: '<p>Dubai is a city of superlatives – the tallest building, the largest mall, the most luxurious hotel. But beyond the record-breaking structures lies a fascinating blend of traditional Arabian culture and futuristic vision that makes this emirate one of the most unique destinations on Earth.</p>' +
          '<h3>The Modern Marvels</h3>' +
          '<p>Standing at the base of the Burj Khalifa, the world\'s tallest building at 828 meters, is a humbling experience. Taking the high-speed elevator to the observation deck on the 148th floor, the entire city unfolds below like a meticulously planned model. The view at sunset, as the desert turns golden and the city lights begin to twinkle, is absolutely unforgettable.</p>' +
          '<blockquote class="blog-quote"><i class="bi bi-quote"></i><p>"Dubai doesn\'t just push boundaries – it erases them entirely. This is a city where the impossible becomes reality."</p></blockquote>' +
          '<h3>The Traditional Side</h3>' +
          '<p>For a glimpse into old Dubai, head to the Al Fahidi Historical Neighbourhood. The wind-tower houses, narrow lanes, and small museums offer a stark contrast to the gleaming skyscrapers just a few kilometers away. A traditional abra (water taxi) ride across Dubai Creek costs just one dirham and provides one of the city\'s most authentic experiences.</p>' +
          '<ul><li>Desert safari with dune bashing and Bedouin dinner</li><li>Visit the Gold Souk and Spice Souk in Deira</li><li>Explore the Dubai Frame for 360-degree city views</li><li>Relax at Jumeirah Beach with views of the Burj Al Arab</li><li>Experience the Dubai Fountain show at night</li></ul>',
        tags: ['Asia', 'Luxury', 'Adventure', 'City Tour']
      },
      {
        id: 4,
        title: 'Amazing African Safari: A Once-in-a-Lifetime Wildlife Experience',
        date: 'July 30, 2024',
        author: 'James Walker',
        category: 'Adventure',
        image: '../assets/Images/Tour Africa Amazing African Safari.jpg',
        extraImg: '../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls2.jpg',
        content: '<p>There are few experiences on Earth that can rival the thrill of an African safari. The vast savannas, the incredible biodiversity, and the raw, untouched beauty of the African wilderness create memories that last a lifetime. Our journey took us through some of the most spectacular wildlife reserves on the continent.</p>' +
          '<h3>The Great Migration</h3>' +
          '<p>Witnessing the Great Migration in Tanzania\'s Serengeti National Park is one of the natural world\'s most spectacular events. Over two million wildebeest, zebras, and gazelles make their annual journey across the plains in search of fresh grazing lands. The thundering sound of thousands of hooves, the dust clouds rising from the plains, and the dramatic river crossings where crocodiles lie in wait – it\'s nature at its most raw and powerful.</p>' +
          '<blockquote class="blog-quote"><i class="bi bi-quote"></i><p>"Nothing prepares you for the moment you first see a herd of elephants walking across the savanna at golden hour. Time seems to stop."</p></blockquote>' +
          '<h3>Planning Your Safari</h3>' +
          '<p>A successful safari requires careful planning. The best time to visit depends on what you want to see – the dry season (June to October) offers the best wildlife viewing as animals congregate around water sources, while the wet season brings lush landscapes and excellent birdwatching opportunities.</p>' +
          '<ul><li>Choose between luxury lodges and authentic tented camps</li><li>Book early morning and late afternoon game drives for best wildlife sightings</li><li>Bring quality binoculars and a camera with a good zoom lens</li><li>Wear neutral-colored clothing (khaki, olive, brown)</li><li>Always listen to your guide\'s safety instructions</li></ul>',
        tags: ['Africa', 'Safari', 'Adventure', 'Beach']
      },
      {
        id: 5,
        title: 'Snorkeling with Sea Turtles at Molokini Crater, Hawaii',
        date: 'July 22, 2024',
        author: 'Lisa Park',
        category: 'Water Sports',
        image: '../assets/Images/Tour Molokini and Turtle Snorkeling.jpg',
        extraImg: '../assets/Images/Tour 5Day Oahu Tour Honolulu.jpg',
        content: '<p>The crystal-clear waters of Molokini Crater off Maui\'s southwestern coast offer some of the best snorkeling in the world. This partially submerged volcanic crater creates a natural shelter that results in incredibly calm, clear water with visibility often exceeding 150 feet. It\'s an underwater paradise teeming with marine life.</p>' +
          '<h3>Getting There</h3>' +
          '<p>Molokini Crater is accessible only by boat, with most tours departing from Ma\'alaea Harbor in the early morning. The 20-minute boat ride across the channel provides stunning views of Maui\'s coastline and, during winter months, you might even spot humpback whales breaching in the distance.</p>' +
          '<blockquote class="blog-quote"><i class="bi bi-quote"></i><p>"Swimming alongside a Hawaiian green sea turtle as it gracefully glides through the turquoise water is a moment of pure, unscripted wonder."</p></blockquote>' +
          '<h3>What You\'ll See</h3>' +
          '<p>The crater is home to over 250 species of fish, many found nowhere else in the world. The star attractions are undoubtedly the Hawaiian green sea turtles (honu), which are frequently seen feeding on algae-covered rocks. These gentle giants can grow up to four feet long and are remarkably calm around snorkelers.</p>' +
          '<ul><li>Arrive early to get the calmest water conditions</li><li>Use reef-safe sunscreen to protect the marine ecosystem</li><li>Keep a respectful distance from sea turtles (at least 10 feet)</li><li>Bring an underwater camera for incredible photo opportunities</li><li>Consider a guided tour for the best experience and safety</li></ul>',
        tags: ['America', 'Beach', 'Diving', 'Adventure']
      },
      {
        id: 6,
        title: "Argentina's Great Diving Trip: Exploring Patagonia's Underwater World",
        date: 'July 10, 2024',
        author: 'Carlos Mendez',
        category: 'Diving',
        image: '../assets/Images/TT Argentina Great Diving Trip.png',
        extraImg: '../assets/Images/Destinations Page Chile Santiago Wine Country3.jpg',
        content: '<p>Argentina\'s coastline holds some of South America\'s most spectacular dive sites. From encounters with elephant seals and penguins to exploring underwater kelp forests teeming with life, this is a diving adventure unlike any other. The waters of Patagonia offer a unique underwater experience that rivals the world\'s best dive destinations.</p>' +
          '<h3>Puerto Madryn – The Gateway</h3>' +
          '<p>Puerto Madryn, on the coast of Patagonia, is the starting point for most diving adventures in the region. The Golfo Nuevo provides sheltered waters perfect for both beginners and experienced divers. The real magic begins when you descend below the surface – the visibility is often excellent, and the marine life is abundant and diverse.</p>' +
          '<blockquote class="blog-quote"><i class="bi bi-quote"></i><p>"Diving with sea lions in Patagonia is like being invited into their living room. They\'re curious, playful, and incredibly graceful underwater."</p></blockquote>' +
          '<h3>The Underwater Kelp Forests</h3>' +
          '<p>One of the most surreal experiences is diving through the giant kelp forests that line the Patagonian coast. These underwater cathedrals of swaying kelp, reaching heights of over 30 meters, filter the sunlight into dancing beams that illuminate a world of colorful starfish, sea urchins, and nudibranchs.</p>' +
          '<ul><li>Best diving season: November to March (Southern Hemisphere summer)</li><li>Water temperature ranges from 8°C to 16°C – a thick wetsuit is essential</li><li>Sea lion encounters are best at Punta Loma reserve</li><li>Night diving reveals octopuses and bioluminescent plankton</li><li>No prior diving experience needed for introductory dives</li></ul>',
        tags: ['America', 'Diving', 'Adventure', 'Beach']
      }
    ];

    // Get post ID from URL
    var params = new URLSearchParams(window.location.search);
    var postId = parseInt(params.get('post')) || 1;
    var postIndex = postId - 1;
    if (postIndex < 0 || postIndex >= blogPosts.length) postIndex = 0;
    var post = blogPosts[postIndex];

    // Populate page
    var heroTitle = document.getElementById('blogHeroTitle');
    if (heroTitle) heroTitle.innerHTML = post.title;

    var detailTitle = document.getElementById('blogDetailTitle');
    if (detailTitle) detailTitle.textContent = post.title;

    var detailDate = document.getElementById('blogDetailDate');
    if (detailDate) detailDate.textContent = post.date;

    var detailAuthor = document.getElementById('blogDetailAuthor');
    if (detailAuthor) detailAuthor.textContent = post.author;

    var detailCategory = document.getElementById('blogDetailCategory');
    if (detailCategory) detailCategory.textContent = post.category;

    var detailImage = document.getElementById('blogDetailImage');
    if (detailImage) { detailImage.src = post.image; detailImage.alt = post.title; }

    var detailExtraImg = document.getElementById('blogDetailExtraImg');
    if (detailExtraImg) { detailExtraImg.src = post.extraImg; detailExtraImg.alt = post.title + ' additional image'; }

    blogDetailContainer.innerHTML = post.content;

    // Tags
    var tagContainer = document.getElementById('blogDetailTags');
    if (tagContainer) {
      tagContainer.innerHTML = '';
      post.tags.forEach(function (tag) {
        tagContainer.innerHTML += '<a href="#" class="tag-link">' + tag + '</a>';
      });
    }

    // Author box
    var authorName = document.getElementById('blogAuthorName');
    if (authorName) authorName.textContent = post.author;

    var authorInitials = document.getElementById('blogAuthorInitials');
    if (authorInitials) {
      var names = post.author.split(' ');
      authorInitials.textContent = names.map(function (n) { return n[0]; }).join('');
    }

    // Previous / Next navigation
    var prevBtn = document.getElementById('blogPrevBtn');
    var nextBtn = document.getElementById('blogNextBtn');
    var prevTitle = document.getElementById('blogPrevTitle');
    var nextTitle = document.getElementById('blogNextTitle');

    if (postIndex > 0) {
      var prevPost = blogPosts[postIndex - 1];
      if (prevBtn) prevBtn.href = 'blog-details.html?post=' + (postIndex);
      if (prevTitle) prevTitle.textContent = prevPost.title;
    } else {
      var prevWrap = document.getElementById('blogPrevWrap');
      if (prevWrap) prevWrap.style.visibility = 'hidden';
    }

    if (postIndex < blogPosts.length - 1) {
      var nextPost = blogPosts[postIndex + 1];
      if (nextBtn) nextBtn.href = 'blog-details.html?post=' + (postIndex + 2);
      if (nextTitle) nextTitle.textContent = nextPost.title;
    } else {
      var nextWrap = document.getElementById('blogNextWrap');
      if (nextWrap) nextWrap.style.visibility = 'hidden';
    }

    // Update page title
    document.title = 'Travel Tour – ' + post.title;
  }

  /* -------------------------------------------
     TOUR DETAILS – DYNAMIC CONTENT LOADER
     ------------------------------------------- */
  var mainTourImg = document.getElementById('mainTourImg');
  if (mainTourImg) {

    // Real destination banner images (used as a relevant filler thumb
    // for tours that don't have their own dedicated photo set)
    var locationBanner = {
      'America': '../assets/Images/Destinations America.png',
      'Asia': '../assets/Images/Destinations Asia.png',
      'Egypt': '../assets/Images/Destinations Egypt.png',
      'South Africa': '../assets/Images/Destinations South Africa.png',
      'Scandinavia': '../assets/Images/Destinations Scandinavia.png',
      'Western Europe': '../assets/Images/Destinations Western Europe.png'
    };

    // Breadcrumb parent page for each destination/location
    var destinationPage = {
      'America': { href: 'america.html', label: 'America' },
      'Asia': { href: 'asia.html', label: 'Asia' },
      'Egypt': { href: 'egypt.html', label: 'Egypt' },
      'South Africa': { href: 'south-africa.html', label: 'South Africa' },
      'Scandinavia': { href: 'scandinavia.html', label: 'Scandinavia' },
      'Western Europe': { href: 'western-europe.html', label: 'Western Europe' }
    };

    // Master tour database – one entry per unique, clickable tour card
    // found across the whole site (Popular Tours, Freshly Added,
    // Destination pages, Related Tours, etc.)
    var tourData = {
      'argentina': {
        title: 'Argentina – Great Diving Trip',
        location: 'Western Europe',
        breadcrumbLabel: 'Argentina – Great Diving Trip',
        duration: '2 Days 1 Night',
        price: '$1,200',
        oldPrice: '$1,400',
        image: '../assets/Images/TT Argentina Great Diving Trip.png',
        thumbs: ['../assets/Images/Tour Molokini and Turtle Snorkeling.jpg', '../assets/Images/Destinations Page Chile Santiago Wine Country1.jpg', '../assets/Images/Destinations Page Chile Santiago Wine Country2.jpg'],
        detail: [
          "Argentina's coastline holds some of South America's most spectacular dive sites. From encounters with elephant seals and penguins to exploring underwater kelp forests teeming with life, this is a diving adventure unlike any other. We cover the best dive sites, operators, and what to expect during your 2-day underwater journey through the crystal-clear waters of Patagonia.",
          "Our experienced diving instructors will guide you through shallow and deep dives, ensuring safety while maximizing your encounter with incredible marine wildlife. Expect to see sea lions, colorful starfish, octopus, and an abundance of marine flora."
        ],
        includes: ['Professional diving instructor', 'All diving equipment', 'Hotel accommodation (1 night)', 'Breakfast and lunch', 'Airport transfer', 'Travel insurance'],
        whatToExpect: "Upon arrival at the dive site, you will be greeted by your professional diving team. After a brief orientation and equipment check, you'll embark on your first dive in the sheltered bay. The second day features a deep-water excursion where you'll encounter larger marine life in the open ocean.",
        day1Title: 'Arrival & Shallow Dive',
        day1Text: 'Check in at the coastal resort. Afternoon orientation session followed by a 45-minute shallow-water dive in the protected bay. Evening welcome dinner with the diving team.',
        day2Title: 'Deep Dive & Departure',
        day2Text: 'Early morning boat trip to the deep-water dive site. Two dives with marine wildlife encounters. Lunch on the boat. Return to resort and departure transfer to the airport.',
        mapLabel: 'Dive Site Location',
        mapLocation: 'Puerto Madryn, Patagonia, Argentina',
        mapQuery: 'Puerto Madryn Argentina',
        faqQ1: 'Do I need diving experience?',
        faqA1: 'No prior experience is required. Our instructors will provide complete training before each dive. However, basic swimming ability is required.',
        faqQ2: 'What should I bring?',
        faqA2: 'Bring swimwear, sunscreen, a towel, and a sense of adventure! All diving equipment is provided including wetsuits.',
        reviewerName: 'Carlos Mendez',
        reviewerInitials: 'CM',
        reviewText: '"An absolutely unforgettable experience! The underwater kelp forests were breathtaking, and our instructor made everything feel safe and exciting. Highly recommend for anyone visiting Patagonia."'
      },
      'moscow': {
        title: 'Two Moscow Tour of 7 Days',
        location: 'Scandinavia',
        duration: '7 Days 6 Nights',
        price: '$1,500',
        image: '../assets/Images/Tour Two Moscow Tour of 7days.jpg',
        thumbs: ['../assets/Images/Destinations Scandinavia.png', '../assets/Images/Tour Austria 6Days in Vienna Hallstatt.jpg', '../assets/Images/Tour Venice Rome and Milan 9 Days.jpg'],
        detail: [
          "Discover the grandeur of Moscow on this immersive 7-day journey through Russia's historic capital. Wander through Red Square, marvel at the domes of St. Basil's Cathedral, and step inside the walls of the Kremlin.",
          "This tour balances iconic landmarks with authentic local experiences, from traditional Russian cuisine to an evening at the Bolshoi Theatre district, giving you a complete picture of the city's culture and history."
        ]
      },
      'austria': {
        title: 'Austria – 6 Days in Vienna, Hallstatt',
        location: 'Western Europe',
        duration: '6 Days 5 Nights',
        price: '$2,100',
        image: '../assets/Images/Tour Austria 6Days in Vienna Hallstatt.jpg',
        thumbs: ['../assets/Images/Destinations Page Austria 6 Days in Vienna Hallstatt1.jpg', '../assets/Images/Destinations Page Austria 6 Days in Vienna Hallstatt2.jpg', '../assets/Images/Destinations Page Austria 6 Days in Vienna Hallstatt3.jpg'],
        detail: [
          "Blend imperial grandeur with fairy-tale scenery on this 6-day journey through Vienna and Hallstatt. Explore Schönbrunn Palace, the Belvedere's art collections, and Vienna's famous coffee house culture.",
          "From the capital, travel to the lakeside village of Hallstatt, a UNESCO World Heritage site nestled beneath the Dachstein mountains, for scenic hikes and unforgettable photo opportunities."
        ]
      },
      'india': {
        title: 'India – Mumbai & New Delhi',
        location: 'Asia',
        duration: '8 Days 7 Nights',
        price: '$1,100',
        image: '../assets/Images/TT India Mumbai New Delhi.png',
        thumbs: ['../assets/Images/Destinations Asia.png', '../assets/Images/Tour Dubai All Stunning Places.jpg'],
        detail: [
          "Experience the vibrant contrasts of India on this 8-day tour through Mumbai and New Delhi. See the Gateway of India, wander through bustling local markets, and taste authentic regional cuisine.",
          "In New Delhi, explore Mughal-era monuments including Humayun's Tomb and the Red Fort, alongside the wide boulevards and colonial architecture of the capital."
        ]
      },
      'oahu': {
        title: '5-Day Oahu Tour – Honolulu',
        location: 'America',
        duration: '5 Days 4 Nights',
        price: '$1,900',
        image: '../assets/Images/Tour 5Day Oahu Tour Honolulu.jpg',
        thumbs: ['../assets/Images/Tour Molokini and Turtle Snorkeling.jpg', '../assets/Images/Destinations America.png', '../assets/Images/TT America Grand canyon Golden Gate.png'],
        detail: [
          "Soak up the sun and surf on this 5-day escape to Oahu. From the golden sands of Waikiki Beach to the historic Pearl Harbor memorial, this tour covers the island's most iconic sights.",
          "Enjoy guided hikes to Diamond Head crater, a scenic drive along the North Shore, and plenty of time to relax by the Pacific Ocean."
        ]
      },
      'africa-safari': {
        title: 'Africa – Amazing Safari',
        location: 'South Africa',
        duration: '6 Days 5 Nights',
        price: '$1,500',
        image: '../assets/Images/Tour Africa Amazing African Safari.jpg',
        thumbs: ['../assets/Images/Destinations South Africa.png', '../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls1.jpg', '../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls4.jpg'],
        detail: [
          "Get up close with Africa's iconic wildlife on this thrilling 6-day safari. Track lions, elephants, and giraffes across open savannah on guided game drives with experienced local rangers.",
          "Stay in comfortable safari lodges, enjoy bush breakfasts, and witness unforgettable sunsets over the plains on this once-in-a-lifetime wildlife adventure."
        ]
      },
      'dubai': {
        title: 'Dubai – All Stunning Places',
        location: 'Asia',
        duration: '5 Days 4 Nights',
        price: '$3,200',
        image: '../assets/Images/Tour Dubai All Stunning Places.jpg',
        thumbs: ['../assets/Images/Destinations Asia.png', '../assets/Images/TT India Mumbai New Delhi.png'],
        detail: [
          "Discover the dazzling skyline and desert adventures of Dubai on this 5-day tour. Ride to the top of the Burj Khalifa, browse the Gold Souk, and experience a thrilling desert safari with dune bashing.",
          "Relax on Jumeirah Beach, admire the Dubai Fountain show, and explore the historic Al Fahidi district for a taste of traditional Emirati culture."
        ]
      },
      'venice-rome-milan': {
        title: 'Venice – Rome and Milan',
        location: 'Western Europe',
        duration: '9 Days 8 Nights',
        price: '$3,100',
        image: '../assets/Images/Tour Venice Rome and Milan 9 Days.jpg',
        thumbs: ['../assets/Images/Destinations Western Europe.png', '../assets/Images/Tour Austria 6Days in Vienna Hallstatt.jpg', '../assets/Images/Tour Pais Eiffel Tower Notre Dame Cath.jpg'],
        detail: [
          "Journey through three of Italy's most iconic cities on this 9-day tour. Glide along Venice's canals by gondola, toss a coin in Rome's Trevi Fountain, and explore the ancient Colosseum.",
          "Finish in Milan, Italy's fashion capital, with visits to the stunning Duomo cathedral and time to shop the city's famous boutiques."
        ]
      },
      'paris': {
        title: 'Enjoy Paris – 6 Days',
        location: 'Western Europe',
        duration: '6 Days 5 Nights',
        price: '$1,900',
        image: '../assets/Images/Tour Pais Eiffel Tower Notre Dame Cath.jpg',
        thumbs: ['../assets/Images/Destinations Page Pais Eiffel Tower Notre Dame Cath1.jpg', '../assets/Images/Destinations Page Pais Eiffel Tower Notre Dame Cath2.jpg', '../assets/Images/Destinations Page Pais Eiffel Tower Notre Dame Cath3.jpg'],
        detail: [
          "Fall in love with the City of Light on this 6-day Paris getaway. Visit the Eiffel Tower, Notre Dame Cathedral, and the Louvre, home to some of the world's most famous works of art.",
          "Wander the charming streets of Montmartre, enjoy a Seine river cruise, and savor fresh pastries at a neighborhood boulangerie for a truly authentic Parisian experience."
        ]
      },
      'grand-canyon': {
        title: 'America – Grand Canyon & Golden Gate',
        location: 'America',
        duration: '10 Days 9 Nights',
        price: '$2,500',
        image: '../assets/Images/TT America Grand canyon Golden Gate.png',
        thumbs: ['../assets/Images/Destinations America.png', '../assets/Images/Tour 5Day Oahu Tour Honolulu.jpg', '../assets/Images/Tour Molokini and Turtle Snorkeling.jpg'],
        detail: [
          "Cross the American West on this epic 10-day road trip from the Grand Canyon to San Francisco's Golden Gate Bridge. Stand at the canyon's rim for breathtaking sunrise and sunset views.",
          "Continue through iconic national parks and scenic highways before arriving in San Francisco to explore Fisherman's Wharf, Alcatraz, and the city's famous cable cars."
        ]
      },
      'molokini': {
        title: 'Molokini & Turtle Snorkeling',
        location: 'America',
        duration: '1 Day',
        price: '$1,000',
        image: '../assets/Images/Tour Molokini and Turtle Snorkeling.jpg',
        thumbs: ['../assets/Images/Tour 5Day Oahu Tour Honolulu.jpg', '../assets/Images/Destinations America.png', '../assets/Images/TT America Grand canyon Golden Gate.png'],
        detail: [
          "Spend a day snorkeling in the crystal-clear waters of Molokini Crater, one of Hawaii's most spectacular marine reserves. Swim alongside Hawaiian green sea turtles and vibrant tropical fish.",
          "This guided boat tour includes all snorkeling equipment, lunch on board, and a scenic ride along Maui's stunning coastline."
        ]
      },
      'asia-discovery': {
        title: 'Asia Discovery',
        location: 'Asia',
        duration: '14 Days 13 Nights',
        price: '$2,100',
        image: '../assets/Images/Destinations Asia.png',
        thumbs: ['../assets/Images/TT India Mumbai New Delhi.png', '../assets/Images/Tour Dubai All Stunning Places.jpg'],
        detail: [
          "Explore the diverse cultures, cuisines, and landscapes of Asia on this comprehensive 14-day journey. From bustling city streets to ancient temples, this tour offers an unforgettable cross-section of the continent.",
          "Sample regional street food, visit centuries-old religious sites, and experience the unique blend of tradition and modernity that defines Asia today."
        ]
      },
      'egypt-pyramids': {
        title: 'Egypt Pyramids Tour',
        location: 'Egypt',
        duration: '5 Days 4 Nights',
        price: '$1,300',
        image: '../assets/Images/Destinations Egypt.png',
        thumbs: ['../assets/Images/Tour Dubai All Stunning Places.jpg', '../assets/Images/Destinations Asia.png'],
        detail: [
          "Stand before the Great Pyramids of Giza and the Sphinx on this unforgettable 5-day journey through ancient Egypt. Cruise the Nile River and explore the treasures of the Egyptian Museum.",
          "Discover the temples of Luxor and Karnak, and experience the rich history of one of the world's oldest civilizations."
        ]
      },
      'johannesburg': {
        title: 'Johannesburg – Victoria Falls',
        location: 'South Africa',
        duration: '5 Days 4 Nights',
        price: '$1,800',
        image: '../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls.jpg',
        thumbs: ['../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls1.jpg', '../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls2.jpg', '../assets/Images/Destinations South Africa 5Day Johannesburg Victoria Falls3.jpg'],
        detail: [
          "Combine city and wilderness on this 5-day journey from Johannesburg to the thundering Victoria Falls. Explore Johannesburg's Apartheid Museum and vibrant Soweto district before heading north.",
          "Witness the raw power of Victoria Falls, one of the Seven Natural Wonders of the World, with options for scenic flights and adrenaline activities along the Zambezi River."
        ]
      },
      'chile-south-africa': {
        title: 'Chile – Santiago, Wine Country',
        location: 'South Africa',
        duration: '7 Days 6 Nights',
        price: '$1,200',
        image: '../assets/Images/Destinations Page South Africa Chile Santiago Wine Country.jpg',
        thumbs: ['../assets/Images/Destinations Page South Africa Chile Santiago Wine Country1.jpg', '../assets/Images/Destinations South Africa.png', '../assets/Images/Destinations Page Chile Santiago Wine Country1.jpg'],
        detail: [
          "Savor world-class wines and stunning scenery on this 7-day tour through Santiago's surrounding wine country. Visit renowned vineyards, sample regional varietals, and enjoy farm-to-table dining.",
          "Explore the vibrant capital of Santiago, framed by the Andes mountains, before venturing into the rolling hills and valleys that make this region a wine lover's paradise."
        ]
      },
      'scandinavia-highlights': {
        title: 'Scandinavia Highlights',
        location: 'Scandinavia',
        duration: '9 Days 8 Nights',
        price: '$2,500',
        image: '../assets/Images/Destinations Scandinavia.png',
        thumbs: ['../assets/Images/Tour Two Moscow Tour of 7days.jpg', '../assets/Images/Destinations Western Europe.png'],
        detail: [
          "Discover the fjords, charming cities, and Nordic culture of Scandinavia on this 9-day highlights tour. Wander the colorful streets of Copenhagen and Stockholm's old town, Gamla Stan.",
          "Cruise through dramatic Norwegian fjords and experience the clean design, cozy cafes, and natural beauty that define this stunning corner of Northern Europe."
        ]
      },
      'brazil-rio': {
        title: 'Brazil – Rio de Janeiro',
        location: 'Western Europe',
        duration: '5 Days 4 Nights',
        price: '$2,800',
        image: '../assets/Images/Destinations Page Brazil Rio de Janeiro.png',
        thumbs: ['../assets/Images/Destinations Page Brazil Rio de Janeiro1.jpg', '../assets/Images/Destinations Page Brazil Rio de Janeiro2.jpg', '../assets/Images/Destinations Page Brazil Rio de Janeiro3.jpg'],
        detail: [
          "Experience the energy of Rio de Janeiro on this 5-day tour, from the iconic Christ the Redeemer statue to the golden sands of Copacabana and Ipanema beaches.",
          "Ride the cable car up Sugarloaf Mountain, explore the colorful Santa Teresa neighborhood, and feel the rhythm of samba in one of the world's most vibrant cities."
        ]
      },
      'chile-western-europe': {
        title: 'Chile – Santiago, Wine Country',
        location: 'Western Europe',
        duration: '7 Days 6 Nights',
        price: '$3,200',
        image: '../assets/Images/Destinations Page Chile Santiago Wine Country.png',
        thumbs: ['../assets/Images/Destinations Page Chile Santiago Wine Country1.jpg', '../assets/Images/Destinations Page Chile Santiago Wine Country2.jpg', '../assets/Images/Destinations Page Chile Santiago Wine Country3.jpg'],
        detail: [
          "Savor world-class wines and stunning scenery on this 7-day tour through Santiago's surrounding wine country. Visit renowned vineyards, sample regional varietals, and enjoy farm-to-table dining.",
          "Explore the vibrant capital of Santiago, framed by the Andes mountains, before venturing into the rolling hills and valleys that make this region a wine lover's paradise."
        ]
      }
    };

    var tourIds = Object.keys(tourData);

    // Get requested tour id from the URL (?tour=slug), default to Argentina
    // so a bare tour-details.html link keeps behaving exactly as before.
    var tourParams = new URLSearchParams(window.location.search);
    var requestedTour = tourParams.get('tour');
    if (requestedTour === 'paris-eiffel' || requestedTour === 'paris-enquiry') {
    requestedTour = 'paris';}

    var tourId = (requestedTour && tourData[requestedTour])
    ? requestedTour
    : 'argentina';

    var tour = tourData[tourId];

    // Fill in sensible, non-conflicting defaults for any field that
    // a given tour didn't explicitly override above.
    var dest = destinationPage[tour.location] || destinationPage['Western Europe'];
    var banner = locationBanner[tour.location] || tour.image;

    // Safety net only: every tour above now defines its own non-duplicate
    // thumbs, but if a future tour is added without one, fall back to the
    // single destination banner rather than repeating the main image.
    var thumbs = tour.thumbs || [banner];
    var includes = tour.includes || ['Professional English-speaking guide', 'All tour activities & entrance fees', 'Hotel accommodation', 'Breakfast daily', 'Airport transfer', 'Travel insurance'];
    var whatToExpect = tour.whatToExpect || ('Upon arrival, you will be greeted by your professional tour guide. After a brief orientation, you\'ll begin exploring the best that ' + tour.location + ' has to offer, with each day carefully planned to maximize your experience.');
    var day1Title = tour.day1Title || 'Arrival & Welcome';
    var day1Text = tour.day1Text || ('Check in and settle into your accommodation. Enjoy an orientation session with your guide, followed by an evening welcome dinner.');
    var day2Title = tour.day2Title || 'Full-Day Exploration';
    var day2Text = tour.day2Text || ('A full day exploring the best that ' + tour.title + ' has to offer, guided by our expert local team. Return to your accommodation in the evening.');
    var mapLabel = tour.mapLabel || 'Tour Location';
    var mapLocation = tour.mapLocation || (tour.title + ' — ' + tour.location);
    var mapQuery = tour.mapQuery || (tour.location + ' ' + tour.title);
    var faqQ1 = tour.faqQ1 || 'Do I need prior experience?';
    var faqA1 = tour.faqA1 || 'No prior experience is required. Our guides provide a full orientation before each activity, and the tour is suitable for most fitness levels.';
    var faqQ2 = tour.faqQ2 || 'What should I bring?';
    var faqA2 = tour.faqA2 || 'Comfortable clothing, sunscreen, a camera, and a sense of adventure! Any specialized equipment needed is provided.';
    var reviewerName = tour.reviewerName || 'Alex Johnson';
    var reviewerInitials = tour.reviewerInitials || 'AJ';
    var reviewText = tour.reviewText || ('"An absolutely unforgettable experience! Everything was well organized and our guide made us feel safe and looked after every step of the way. Highly recommend ' + tour.title + ' to anyone visiting ' + tour.location + '."');

    function wrapLastWord(text) {
      var words = text.split(' ');
      if (words.length < 2) return text;
      var last = words.pop();
      return words.join(' ') + ' <span>' + last + '</span>';
    }

    // Page title / meta
    document.title = 'Travel Tour – ' + tour.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', tour.title + '. ' + (tour.detail && tour.detail[0] ? tour.detail[0] : ''));

    // Hero title & breadcrumb
    var heroTitle = document.getElementById('tourHeroTitle');
    if (heroTitle) heroTitle.innerHTML = wrapLastWord(tour.title);

    var crumbLink = document.getElementById('tourBreadcrumbParentLink');
    if (crumbLink) { crumbLink.textContent = dest.label; crumbLink.setAttribute('href', dest.href); }

    var crumbActive = document.getElementById('tourBreadcrumbActive');
    if (crumbActive) crumbActive.textContent = tour.title;

    // Gallery – main image + thumbnails (thumbnail click handlers keep
    // working automatically since they read this.src at click time)
    mainTourImg.src = tour.image;
    mainTourImg.alt = tour.title;

    var galleryThumbs = document.getElementById('tourGalleryThumbs');
    if (galleryThumbs) {
      galleryThumbs.innerHTML = '';
      thumbs.forEach(function (src, i) {
        galleryThumbs.innerHTML += '<div class="col-4"><img src="' + src + '" alt="' + tour.title + ' Thumb ' + (i + 1) + '" class="thumb-img" onclick="document.getElementById(\'mainTourImg\').src=this.src" /></div>';
      });
    }

    // Title, badge, price
    var titleH2 = document.getElementById('tourTitleH2');
    if (titleH2) titleH2.textContent = tour.title;

    var durationBadge = document.getElementById('tourDurationBadge');
    if (durationBadge) durationBadge.innerHTML = '<i class="bi bi-clock"></i> ' + tour.duration;

    var bookingPrice = document.getElementById('tourBookingPrice');
    if (bookingPrice) {
      var priceNum = parseFloat(String(tour.price).replace(/[^0-9.]/g, ''));
      if (!isNaN(priceNum)) bookingPrice.setAttribute('data-price-usd', priceNum);
      bookingPrice.textContent = tour.price;
    }

    var bookingPriceOld = document.getElementById('tourBookingPriceOld');
    if (bookingPriceOld) {
      if (tour.oldPrice) {
        var oldPriceNum = parseFloat(String(tour.oldPrice).replace(/[^0-9.]/g, ''));
        if (!isNaN(oldPriceNum)) bookingPriceOld.setAttribute('data-price-usd', oldPriceNum);
        bookingPriceOld.textContent = tour.oldPrice;
        bookingPriceOld.style.display = '';
      }
      else { bookingPriceOld.style.display = 'none'; }
    }

    // Re-apply the currently selected currency now that dynamic prices are in the DOM
    applyCurrency(savedCurrency);

    // Detail description
    var detailText = document.getElementById('tourDetailText');
    if (detailText) {
      detailText.innerHTML = (tour.detail || []).map(function (p) { return '<p>' + p + '</p>'; }).join('');
    }

    // Price includes
    var includesList = document.getElementById('tourIncludesList');
    if (includesList) {
      includesList.innerHTML = includes.map(function (item) {
        return '<li><i class="bi bi-check-circle-fill"></i> ' + item + '</li>';
      }).join('');
    }

    // What to expect
    var whatToExpectEl = document.getElementById('tourWhatToExpect');
    if (whatToExpectEl) whatToExpectEl.textContent = whatToExpect;

    // Itinerary
    var day1TitleEl = document.getElementById('tourDay1Title');
    if (day1TitleEl) day1TitleEl.textContent = day1Title;
    var day1TextEl = document.getElementById('tourDay1Text');
    if (day1TextEl) day1TextEl.textContent = day1Text;
    var day2TitleEl = document.getElementById('tourDay2Title');
    if (day2TitleEl) day2TitleEl.textContent = day2Title;
    var day2TextEl = document.getElementById('tourDay2Text');
    if (day2TextEl) day2TextEl.textContent = day2Text;

    // Map
    var mapLabelEl = document.getElementById('tourMapLabel');
    if (mapLabelEl) mapLabelEl.textContent = mapLabel;
    var mapLocationEl = document.getElementById('tourMapLocationText');
    if (mapLocationEl) mapLocationEl.textContent = mapLocation;
    var mapLinkEl = document.getElementById('tourMapLink');
    if (mapLinkEl) mapLinkEl.setAttribute('href', 'https://maps.google.com/?q=' + encodeURIComponent(mapQuery));

    // FAQ (first two questions are tour-specific; age limit & cancellation stay generic)
    var faqBtn1 = document.getElementById('tourFaqBtn1');
    if (faqBtn1) faqBtn1.textContent = faqQ1;
    var faqBody1 = document.getElementById('tourFaqBody1');
    if (faqBody1) faqBody1.textContent = faqA1;
    var faqBtn2 = document.getElementById('tourFaqBtn2');
    if (faqBtn2) faqBtn2.textContent = faqQ2;
    var faqBody2 = document.getElementById('tourFaqBody2');
    if (faqBody2) faqBody2.textContent = faqA2;

    // Review
    var reviewerNameEl = document.getElementById('tourReviewerName');
    if (reviewerNameEl) reviewerNameEl.textContent = reviewerName;
    var reviewerInitialsEl = document.getElementById('tourReviewerInitials');
    if (reviewerInitialsEl) reviewerInitialsEl.textContent = reviewerInitials;
    var reviewTextEl = document.getElementById('tourReviewText');
    if (reviewTextEl) reviewTextEl.textContent = reviewText;

    // Related Tours – pick the next 3 tours in the catalog (wrapping
    // around), always excluding the tour currently being viewed.
    var relatedContainer = document.getElementById('tourRelatedContainer');
    if (relatedContainer) {
      var startIndex = tourIds.indexOf(tourId);
      var related = [];
      for (var i = 1; related.length < 3 && i <= tourIds.length; i++) {
        var candidateId = tourIds[(startIndex + i) % tourIds.length];
        if (candidateId !== tourId) related.push(candidateId);
      }
      relatedContainer.innerHTML = related.map(function (id) {
        var t = tourData[id];
        return '<div class="col-md-4">' +
          '<div class="card tour-card shadow-sm h-100">' +
          '<a href="tour-details.html?tour=' + id + '"><img src="' + t.image + '" class="card-img-top" alt="' + t.title + '" /></a>' +
          '<div class="card-body">' +
          '<h6 class="neutron-bold mb-1"><a href="tour-details.html?tour=' + id + '" class="text-dark text-decoration-none">' + t.title + '</a></h6>' +
          '<div class="star-rating mb-1"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>' +
          '<span class="price">' + t.price + '</span>' +
          '</div></div></div>';
      }).join('');
    }
  }

/* =============================================
   GALLERY PAGE — behaviour for pages/gallery.html
   Vanilla JS, no external libraries (same approach
   as the multi-card carousel in script.js).
   ============================================= */

  /* ---------------------------------------------
     1) HORIZONTAL SCROLLING — custom draggable scrollbar
     --------------------------------------------- */
  var hTrack = document.getElementById('hscrollTrack');
  var hBar = document.getElementById('hscrollBar');
  var hThumb = document.getElementById('hscrollThumb');

  if (hTrack && hBar && hThumb) {
    function updateThumb() {
      var ratio = hTrack.clientWidth / hTrack.scrollWidth;
      var thumbWidth = Math.max(ratio * hBar.clientWidth, 40);
      var maxThumbLeft = hBar.clientWidth - thumbWidth;
      var scrollRatio = hTrack.scrollLeft / (hTrack.scrollWidth - hTrack.clientWidth || 1);
      hThumb.style.width = thumbWidth + 'px';
      hThumb.style.left = (scrollRatio * maxThumbLeft) + 'px';
    }

    hTrack.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    updateThumb();

    var isDragging = false;
    var dragStartX = 0;
    var dragStartScroll = 0;

    hThumb.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartScroll = hTrack.scrollLeft;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var deltaX = e.clientX - dragStartX;
      var trackScrollable = hTrack.scrollWidth - hTrack.clientWidth;
      var barScrollable = hBar.clientWidth - hThumb.offsetWidth;
      var scrollDelta = (deltaX / (barScrollable || 1)) * trackScrollable;
      hTrack.scrollLeft = dragStartScroll + scrollDelta;
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
      document.body.style.userSelect = '';
    });

    /* click on the bar itself jumps to that position */
    hBar.addEventListener('mousedown', function (e) {
      if (e.target === hThumb) return;
      var barRect = hBar.getBoundingClientRect();
      var clickRatio = (e.clientX - barRect.left) / barRect.width;
      hTrack.scrollLeft = clickRatio * (hTrack.scrollWidth - hTrack.clientWidth);
    });

    /* touch support */
    hThumb.addEventListener('touchstart', function (e) {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartScroll = hTrack.scrollLeft;
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var deltaX = e.touches[0].clientX - dragStartX;
      var trackScrollable = hTrack.scrollWidth - hTrack.clientWidth;
      var barScrollable = hBar.clientWidth - hThumb.offsetWidth;
      var scrollDelta = (deltaX / (barScrollable || 1)) * trackScrollable;
      hTrack.scrollLeft = dragStartScroll + scrollDelta;
    }, { passive: true });

    document.addEventListener('touchend', function () {
      isDragging = false;
    });
  }

  /* ---------------------------------------------
     2) GALLERY PLAIN CAROUSEL — prev/next + autoplay
     --------------------------------------------- */
  var plainCarousel = document.getElementById('plainCarousel');
  if (plainCarousel) {
    var plainTrack = document.getElementById('plainTrack');
    var plainSlides = plainTrack.querySelectorAll('.plain-carousel-slide');
    var plainIndex = 0;
    var plainTimer = null;

    function goToPlainSlide(i) {
      plainIndex = (i + plainSlides.length) % plainSlides.length;
      plainTrack.style.transform = 'translateX(-' + (plainIndex * 100) + '%)';
    }

    plainCarousel.querySelectorAll('.carousel-control-custom').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToPlainSlide(plainIndex + parseInt(btn.dataset.dir, 10));
        restartPlainAutoplay();
      });
    });

    function startPlainAutoplay() {
      plainTimer = setInterval(function () {
        goToPlainSlide(plainIndex + 1);
      }, 5000);
    }
    function restartPlainAutoplay() {
      clearInterval(plainTimer);
      startPlainAutoplay();
    }
    plainCarousel.addEventListener('mouseenter', function () { clearInterval(plainTimer); });
    plainCarousel.addEventListener('mouseleave', startPlainAutoplay);
    startPlainAutoplay();
  }

  /* ---------------------------------------------
     3) GALLERY WITH THUMBNAIL
     --------------------------------------------- */
  var thumbGallery = document.getElementById('thumbGallery');
  if (thumbGallery) {
    var thumbMainImg = document.getElementById('thumbMainImg');
    var thumbMainTitle = document.getElementById('thumbMainTitle');
    var thumbs = thumbGallery.querySelectorAll('.thumb-gallery-thumb');
    var thumbIndex = 0;

    function showThumb(i) {
      thumbIndex = (i + thumbs.length) % thumbs.length;
      var target = thumbs[thumbIndex];
      thumbMainImg.style.opacity = 0;
      setTimeout(function () {
        thumbMainImg.src = target.dataset.full;
        thumbMainTitle.textContent = target.dataset.title;
        thumbMainImg.style.opacity = 1;
      }, 150);
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      target.classList.add('active');
    }

    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { showThumb(i); });
    });

    var thumbPrev = document.getElementById('thumbPrev');
    var thumbNext = document.getElementById('thumbNext');
    if (thumbPrev) thumbPrev.addEventListener('click', function () { showThumb(thumbIndex - 1); });
    if (thumbNext) thumbNext.addEventListener('click', function () { showThumb(thumbIndex + 1); });
  }

  /* ---------------------------------------------
     4) SHARED LIGHTBOX — grid / horizontal-scroll / vertical
     --------------------------------------------- */
  var lightbox = document.getElementById('galleryLightbox');
  if (lightbox) {
    var lbImg = document.getElementById('lightboxImg');
    var lbCaption = document.getElementById('lightboxCaption');
    var lbClose = document.getElementById('lightboxClose');
    var lbPrev = document.getElementById('lightboxPrev');
    var lbNext = document.getElementById('lightboxNext');

    var groups = {};
    document.querySelectorAll('.gallery-lightbox-trigger').forEach(function (el) {
      var group = el.dataset.group || 'default';
      if (!groups[group]) groups[group] = [];
      groups[group].push(el);
    });

    var activeGroup = [];
    var activeIndex = 0;

    function openLightbox(group, index) {
      activeGroup = groups[group];
      activeIndex = index;
      renderLightbox();
      lightbox.classList.add('show');
    }
    function renderLightbox() {
      var el = activeGroup[activeIndex];
      lbImg.src = el.dataset.full;
      lbCaption.textContent = el.dataset.caption || '';
    }
    function closeLightbox() {
      lightbox.classList.remove('show');
    }

    Object.keys(groups).forEach(function (group) {
      groups[group].forEach(function (el, index) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openLightbox(group, index);
        });
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lbPrev.addEventListener('click', function () {
      activeIndex = (activeIndex - 1 + activeGroup.length) % activeGroup.length;
      renderLightbox();
    });
    lbNext.addEventListener('click', function () {
      activeIndex = (activeIndex + 1) % activeGroup.length;
      renderLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbPrev.click();
      if (e.key === 'ArrowRight') lbNext.click();
    });
  }



      /* ---------------------------------------------
     1) ENQUIRY FORM VALIDATION
     --------------------------------------------- */
  var serviceEnquiryForm = document.getElementById('serviceEnquiryForm');
  if (serviceEnquiryForm) {
    serviceEnquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var fullName = document.getElementById('osFullName');
      var email = document.getElementById('osEmail');
      var subject = document.getElementById('osSubject');
      var message = document.getElementById('osMessage');
      var terms = document.getElementById('osAgreeTerms');

      serviceEnquiryForm.querySelectorAll('.form-control, .form-check-input').forEach(function (el) {
        el.classList.remove('is-invalid');
      });

      if (fullName && !fullName.value.trim()) {
        fullName.classList.add('is-invalid');
        valid = false;
      }
      if (email && (!email.value.trim() || !isValidEmail(email.value.trim()))) {
        email.classList.add('is-invalid');
        valid = false;
      }
      if (subject && !subject.value.trim()) {
        subject.classList.add('is-invalid');
        valid = false;
      }
      if (message && !message.value.trim()) {
        message.classList.add('is-invalid');
        valid = false;
      }
      if (terms && !terms.checked) {
        terms.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) {
        showToast('Please fill in all required fields correctly.', 'error');
        return;
      }

      showToast('Message sent successfully! We will get back to you within 24 hours.', 'success');
      serviceEnquiryForm.reset();
      serviceEnquiryForm.querySelectorAll('.form-control, .form-check-input').forEach(function (el) {
        el.classList.remove('is-invalid');
      });
    });
  }

  /* ---------------------------------------------
     2) VIDEO MODAL — load/unload the YouTube embed
     so playback stops as soon as the modal closes.
     --------------------------------------------- */
  var osVideoModal = document.getElementById('osVideoModal');
  if (osVideoModal) {
    var osVideoFrame = document.getElementById('osVideoFrame');
    var osVideoSrc = 'https://www.youtube.com/embed/L3V7LKYPIUQ?autoplay=1&rel=0';
    osVideoModal.addEventListener('shown.bs.modal', function () {
      osVideoFrame.src = osVideoSrc;
    });
    osVideoModal.addEventListener('hidden.bs.modal', function () {
      osVideoFrame.src = '';
    });
  }


  var faqItems = document.querySelectorAll('.about-faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.about-faq-q');
    var toggleIcon = item.querySelector('.about-faq-toggle');

    question.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      toggleIcon.innerHTML = isOpen
          ? '<i class="bi bi-dash-lg"></i>'
          : '<i class="bi bi-plus-lg"></i>';
      question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* =============================================
     TOUR SEARCH PAGE FILTERING LOGIC
     ============================================= */
  const tsApplyBtn = document.getElementById('tsApplyBtn');
  const tsResetBtn = document.getElementById('tsResetBtn');
  const tsSortSelect = document.getElementById('tsSortSelect');
  const tsFilterPrice = document.getElementById('tsFilterPrice');
  const tsPriceLabel = document.getElementById('tsPriceLabel');
  const tsCards = document.querySelectorAll('.ts-card');
  const tsResultCount = document.getElementById('tsResultCount');
  const tsNoResults = document.getElementById('tsNoResults');
  const tsNoResultsReset = document.getElementById('tsNoResultsReset');
  const tsCardsContainer = document.getElementById('tsCardsContainer');
  
  if (tsApplyBtn && tsCardsContainer) {
    // Top bar elements
    const tsTopSearchBtn = document.getElementById('tsTopSearchBtn');
    
    // Update price label instantly
    if (tsFilterPrice) {
      tsFilterPrice.addEventListener('input', () => {
        if (tsPriceLabel) tsPriceLabel.textContent = '$' + Number(tsFilterPrice.value).toLocaleString();
      });
    }

    const applyTourFilters = () => {
      // Sidebar values
      const dest = document.getElementById('tsFilterDest') ? document.getElementById('tsFilterDest').value : '';
      const type = document.getElementById('tsFilterType') ? document.getElementById('tsFilterType').value : '';
      const duration = document.getElementById('tsFilterDuration') ? document.getElementById('tsFilterDuration').value : '';
      const maxPrice = tsFilterPrice ? parseInt(tsFilterPrice.value, 10) : 5000;
      const minRatingEl = document.querySelector('input[name="tsRating"]:checked');
      const minRating = minRatingEl ? parseInt(minRatingEl.value, 10) : 0;
      
      const features = Array.from(document.querySelectorAll('.ts-feat-check:checked')).map(el => el.value);

      // Top bar fallback if empty (top bar overrides sidebar if used directly via top button, but keeping simple for now)
      
      let visibleCount = 0;
      let visibleCards = [];

      tsCards.forEach(card => {
        const cDest = card.dataset.dest || '';
        const cType = card.dataset.type || '';
        const cDurStr = card.dataset.durationDays || '0';
        const cDur = parseInt(cDurStr, 10);
        const cPrice = parseInt(card.dataset.priceUsd || '0', 10);
        const cRating = parseInt(card.dataset.rating || '0', 10);
        const cFeatures = card.dataset.features || '';

        let match = true;

        if (dest && cDest !== dest) match = false;
        if (type && !cType.includes(type)) match = false;
        
        if (match && duration) {
          if (duration === '1-3' && (cDur < 1 || cDur > 3)) match = false;
          else if (duration === '4-7' && (cDur < 4 || cDur > 7)) match = false;
          else if (duration === '8-14' && (cDur < 8 || cDur > 14)) match = false;
          else if (duration === '15+' && cDur < 15) match = false;
        }

        if (match && cPrice > maxPrice) match = false;
        if (match && cRating < minRating) match = false;

        if (match && features.length > 0) {
          // MUST have all checked features
          for (const feat of features) {
            if (!cFeatures.includes(feat)) {
              match = false;
              break;
            }
          }
        }

        if (match) {
          card.classList.remove('d-none');
          visibleCount++;
          visibleCards.push(card);
        } else {
          card.classList.add('d-none');
        }
      });

      if (tsResultCount) tsResultCount.textContent = visibleCount;

      if (visibleCount === 0) {
        if (tsNoResults) tsNoResults.classList.remove('d-none');
      } else {
        if (tsNoResults) tsNoResults.classList.add('d-none');
        sortTourCards(visibleCards);
      }
    };

    const sortTourCards = (cardsArray) => {
      if (!tsSortSelect) return;
      const sortBy = tsSortSelect.value;
      
      cardsArray.sort((a, b) => {
        if (sortBy === 'price-asc') {
          return parseInt(a.dataset.priceUsd || 0) - parseInt(b.dataset.priceUsd || 0);
        } else if (sortBy === 'price-desc') {
          return parseInt(b.dataset.priceUsd || 0) - parseInt(a.dataset.priceUsd || 0);
        } else if (sortBy === 'rating-desc') {
          return parseInt(b.dataset.rating || 0) - parseInt(a.dataset.rating || 0);
        } else if (sortBy === 'duration-asc') {
          return parseInt(a.dataset.durationDays || 0) - parseInt(b.dataset.durationDays || 0);
        } else { // popularity
          return parseInt(b.dataset.popularity || 0) - parseInt(a.dataset.popularity || 0);
        }
      });
      
      // Re-append to DOM in order
      cardsArray.forEach(card => tsCardsContainer.appendChild(card));
    };

    const resetTourFilters = () => {
      // Sidebar
      if (document.getElementById('tsFilterDest')) document.getElementById('tsFilterDest').value = '';
      if (document.getElementById('tsFilterType')) document.getElementById('tsFilterType').value = '';
      if (document.getElementById('tsFilterDuration')) document.getElementById('tsFilterDuration').value = '';
      if (tsFilterPrice) {
        tsFilterPrice.value = '5000';
        if (tsPriceLabel) tsPriceLabel.textContent = '$5,000';
      }
      document.querySelectorAll('input[name="tsRating"]').forEach(r => {
        if (r.value === "0") r.checked = true;
      });
      document.querySelectorAll('.ts-feat-check').forEach(c => c.checked = false);
      
      // Top bar
      if (document.getElementById('tsTopDestination')) document.getElementById('tsTopDestination').value = '';
      if (document.getElementById('tsTopType')) document.getElementById('tsTopType').value = '';
      
      applyTourFilters();
    };

    // Events
    tsApplyBtn.addEventListener('click', applyTourFilters);
    if (tsTopSearchBtn) tsTopSearchBtn.addEventListener('click', () => {
      // Sync top bar to sidebar
      const topDest = document.getElementById('tsTopDestination').value.toLowerCase();
      if (topDest && document.getElementById('tsFilterDest')) {
        // basic matching for top bar text to dropdown values
        Array.from(document.getElementById('tsFilterDest').options).forEach(opt => {
          if (opt.value && (opt.value.includes(topDest) || opt.textContent.toLowerCase().includes(topDest))) {
            document.getElementById('tsFilterDest').value = opt.value;
          }
        });
      }
      const topType = document.getElementById('tsTopType').value;
      if (topType && document.getElementById('tsFilterType')) {
        document.getElementById('tsFilterType').value = topType;
      }
      applyTourFilters();
    });
    
    tsResetBtn.addEventListener('click', resetTourFilters);
    if (tsNoResultsReset) tsNoResultsReset.addEventListener('click', resetTourFilters);
    tsSortSelect.addEventListener('change', () => {
      // get visible cards and sort
      const visible = Array.from(tsCards).filter(c => !c.classList.contains('d-none'));
      sortTourCards(visible);
    });
    
    // Initial apply to handle sort/count on page load
    applyTourFilters();
  }

  /* =============================================
     ROOM SEARCH PAGE FILTERING LOGIC
     ============================================= */
  const rsApplyBtn = document.getElementById('rsApplyBtn');
  const rsResetBtn = document.getElementById('rsResetBtn');
  const rsSortSelect = document.getElementById('rsSortSelect');
  const rsFilterPrice = document.getElementById('rsFilterPrice');
  const rsPriceLabel = document.getElementById('rsPriceLabel');
  const rsCards = document.querySelectorAll('.rs-card');
  const rsResultCount = document.getElementById('rsResultCount');
  const rsNoResults = document.getElementById('rsNoResults');
  const rsNoResultsReset = document.getElementById('rsNoResultsReset');
  const rsCardsContainer = document.getElementById('rsCardsContainer');

  if (rsApplyBtn && rsCardsContainer) {
    if (rsFilterPrice) {
      rsFilterPrice.addEventListener('input', () => {
        if (rsPriceLabel) rsPriceLabel.textContent = '$' + Number(rsFilterPrice.value).toLocaleString();
      });
    }

    const applyRoomFilters = () => {
      const dest = document.getElementById('rsFilterDest') ? document.getElementById('rsFilterDest').value : '';
      const maxPrice = rsFilterPrice ? parseInt(rsFilterPrice.value, 10) : 1000;
      
      const types = Array.from(document.querySelectorAll('.rs-type-check:checked')).map(el => el.value);
      const amenities = Array.from(document.querySelectorAll('.rs-amenity-check:checked')).map(el => el.value);
      
      const minRatingEl = document.querySelector('input[name="rsRating"]:checked');
      const minRating = minRatingEl ? parseInt(minRatingEl.value, 10) : 0;

      let visibleCount = 0;
      let visibleCards = [];

      rsCards.forEach(card => {
        const cDest = card.dataset.dest || '';
        const cType = card.dataset.type || '';
        const cPrice = parseInt(card.dataset.priceUsd || '0', 10);
        const cRating = parseInt(card.dataset.rating || '0', 10);
        const cAmens = card.dataset.amenities || '';

        let match = true;

        if (dest && cDest !== dest) match = false;
        
        // Types is an OR filter (if any are checked, card must match one)
        if (match && types.length > 0) {
          let typeMatch = false;
          for (const t of types) {
            if (cType.includes(t)) { typeMatch = true; break; }
          }
          if (!typeMatch) match = false;
        }

        if (match && cPrice > maxPrice) match = false;
        if (match && cRating < minRating) match = false;

        // Amenities is an AND filter (must have all selected)
        if (match && amenities.length > 0) {
          for (const a of amenities) {
            if (!cAmens.includes(a)) {
              match = false;
              break;
            }
          }
        }

        if (match) {
          card.classList.remove('d-none');
          visibleCount++;
          visibleCards.push(card);
        } else {
          card.classList.add('d-none');
        }
      });

      if (rsResultCount) rsResultCount.textContent = visibleCount;

      if (visibleCount === 0) {
        if (rsNoResults) rsNoResults.classList.remove('d-none');
      } else {
        if (rsNoResults) rsNoResults.classList.add('d-none');
        sortRoomCards(visibleCards);
      }
    };

    const sortRoomCards = (cardsArray) => {
      if (!rsSortSelect) return;
      const sortBy = rsSortSelect.value;
      
      cardsArray.sort((a, b) => {
        if (sortBy === 'price-asc') {
          return parseInt(a.dataset.priceUsd || 0) - parseInt(b.dataset.priceUsd || 0);
        } else if (sortBy === 'price-desc') {
          return parseInt(b.dataset.priceUsd || 0) - parseInt(a.dataset.priceUsd || 0);
        } else if (sortBy === 'rating-desc') {
          return parseInt(b.dataset.rating || 0) - parseInt(a.dataset.rating || 0);
        } else { // popularity
          return parseInt(b.dataset.popularity || 0) - parseInt(a.dataset.popularity || 0);
        }
      });
      
      cardsArray.forEach(card => rsCardsContainer.appendChild(card));
    };

    const resetRoomFilters = () => {
      if (document.getElementById('rsFilterDest')) document.getElementById('rsFilterDest').value = '';
      if (rsFilterPrice) {
        rsFilterPrice.value = '1000';
        if (rsPriceLabel) rsPriceLabel.textContent = '$1,000';
      }
      document.querySelectorAll('.rs-type-check').forEach(c => c.checked = false);
      document.querySelectorAll('.rs-amenity-check').forEach(c => c.checked = false);
      document.querySelectorAll('input[name="rsRating"]').forEach(r => {
        if (r.value === "0") r.checked = true;
      });
    };

    rsApplyBtn.addEventListener('click', applyRoomFilters);
    const rsTopSearchBtn = document.getElementById('rsTopSearchBtn');
    if (rsTopSearchBtn) {
       rsTopSearchBtn.addEventListener('click', () => {
         const topDest = document.getElementById('rsTopDestination') ? document.getElementById('rsTopDestination').value.toLowerCase() : '';
         if (topDest && document.getElementById('rsFilterDest')) {
           Array.from(document.getElementById('rsFilterDest').options).forEach(opt => {
             if (opt.value && (opt.value.includes(topDest) || opt.textContent.toLowerCase().includes(topDest))) {
               document.getElementById('rsFilterDest').value = opt.value;
             }
           });
         }
         applyRoomFilters();
       });
    }

rsResetBtn.addEventListener('click', resetRoomFilters);

if (rsNoResultsReset) {
  rsNoResultsReset.addEventListener(
    'click',
    resetRoomFilters
  );
}

rsSortSelect.addEventListener('change', () => {
  const visible = Array.from(rsCards).filter(
    c => !c.classList.contains('d-none')
  );

  sortRoomCards(visible);
});


/* -------------------------------------------
   ROOM SEARCH INITIAL STATE
   Show all rooms on first load without applying filters
   ------------------------------------------- */

rsCards.forEach(card => {
  card.classList.remove('d-none');
});

if (rsResultCount) {
  rsResultCount.textContent = rsCards.length;
}

if (rsNoResults) {
  rsNoResults.classList.add('d-none');
}

if (rsSortSelect) {
  rsSortSelect.value = 'popularity';
  sortRoomCards(Array.from(rsCards));
}}