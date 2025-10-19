<?php

/* @var $this yii\web\View */

$this->title = 'Lakhana Developers';
?>

<style>
    .nav_logo {
        display: flex;
        align-items: center;
    }

    .logo-container {
        display: flex;
        align-items: center;
        margin-right: 10px; /* You can adjust the margin as needed */
    }

    .nav_logo img {
        margin-right: 5px; /* You can adjust the margin as needed */
    }

</style>

<section id="top"></section>
<nav class="sticky">
    <div class="nav_logo">
        <div class="logo-container">
            <img style="width: 40px; padding-right: 2px; padding-bottom: 20px" src="/images/lakhana_logo_wh.png">
            <a href="#top">Lakhana Developers</a>
        </div>
    </div>

    <ul class="nav_links">
        <li class="link"><a href="#insight">Insight</a></li>
        <li class="link"><a href="#projects">Projects</a></li>
        <li class="link"><a href="#team">Our Team</a></li>
        <li class="link"><a href="#downloads">Downloads Section</a></li>
    </ul>
    <a class="btn" href="#team">Contact</a>
</nav>
<header class="section_container header_container" id="about">
    <h1 class="section_header banner">We develop brilliant <span class="typed"></span></h1>
    <script>
        var typed = new Typed('.typed', {
            strings: ['Android apps', 'iPhone apps', 'Web apps', 'backends', 'dashboards', 'APIs', 'Designs'],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            // shuffle: true,
            loop: true,
            // loopCount: 10,
        });
    </script>

    <img src="/themes//olddata/assets/header3.jpg" alt="header" />

    <div class="blockquote-wrapper">
        <div class="blockquote">
            <h1>
                We are a team of talented experts dedicated to bringing your ideas to life through meticulous
                coding, thoughtful design, and rapid prototyping. Whether you're a startup, SME, or enterprise, we
                are committed to delivering innovative, tailor-made solutions that will elevate your business to new
                heights.
                We specialize in crafting exceptional mobile apps for both <span>iPhone</span> and
                <span>Android</span> platforms, dynamic
                web apps, robust <span>APIs</span>, scalable <span>backends</span>, captivating
                <span>dashboards</span>, and everything in between.
            </h1>
            <!-- <h4>&mdash;Lakhana Developers<br><em>One-stop solution</em></h4> -->
            <h4>Who are we?</h4>
        </div>
    </div>

</header>

<section class="section_container booking_container" hidden>
    <div class="booking_nav">
        <span>Economy Class</span>
        <span>Business Class</span>
        <span>First Class</span>
    </div>
    <form>
        <div class="form_group">
            <span><i class="ri-map-pin-line"></i></span>
            <div class="input_content">
                <div class="input_group">
                    <input type="text" />
                    <label>Location</label>
                </div>
                <p>Where are you going?</p>
            </div>
        </div>
        <div class="form_group">
            <span><i class="ri-user-3-line"></i></span>
            <div class="input_content">
                <div class="input_group">
                    <input type="number" />
                    <label>Travellers</label>
                </div>
                <p>Add guests</p>
            </div>
        </div>
        <div class="form_group">
            <span><i class="ri-calendar-line"></i></span>
            <div class="input_content">
                <div class="input_group">
                    <input type="text" />
                    <label>Departure</label>
                </div>
                <p>Add date</p>
            </div>
        </div>
        <div class="form_group">
            <span><i class="ri-calendar-line"></i></span>
            <div class="input_content">
                <div class="input_group">
                    <input type="text" />
                    <label>Return</label>
                </div>
                <p>Add date</p>
            </div>
        </div>
        <button class="btn"><i class="ri-search-line"></i></button>
    </form>
</section>

<section class="section_container plan_container" id="insight">
    <p class="subheader">CODE INSIGHT</p>
    <h2 class="section_header">Future proof coding tools</h2>
    <p class="description">
        Prudently chosen programming languages ensure robust support, cross-platform compatibility, and industry
        recognition, empowering cutting-edge solutions.
    </p>
    <div class="plan_grid">
        <div class="plan_content">
            <span class="number">01</span>
            <h4>Flutter</h4>
            <p>
                Flutter is a UI toolkit and framework developed by Google. It allows us to build natively compiled
                applications for mobile, web, and desktop from a single codebase, using the Dart programming
                language. It offers a rich set of widgets and tools for creating beautiful and performant user
                interfaces.
            </p>
            <span class="number">02</span>
            <h4>PHP</h4>
            <p>
                PHP is a widely used server-side scripting language for web development. It provides a powerful and
                flexible platform to build dynamic websites and web applications. With a vast community, extensive
                libraries, and seamless integration with databases, PHP remains a popular choice for web developers
                worldwide.
            </p>
            <span class="number">03</span>
            <h4>javascript & jquery</h4>
            <p>
                JavaScript is a versatile programming language used for web development, while jQuery is a popular
                JavaScript library that simplifies DOM manipulation, event handling, and AJAX interactions.
            </p>
        </div>
        <div class="plan_image">
            <img src="/themes//olddata/assets/zm-01.jpg" alt="plan" />
            <img src="/themes//olddata/assets/code-01.jpg" alt="plan" />
            <img src="/themes//olddata/assets/mn-01.jpg" alt="plan" />
        </div>
    </div>
</section>

<section class="memories" id="projects">
    <div class="section_container memories_container">
        <div class="memories_header">
            <h2 class="section_header">
                Our Projects
            </h2>
            <button class="view_all" onclick="viewAll()" href="#view-all">View All</button>
            <script>
                function viewAll() {
                    const cards = document.querySelectorAll('.memories_card');
                    const btn = document.querySelector('.view_all');
                    btn.style.display = "none";
                    cards.forEach(card => card.style.display = "block");
                }
            </script>
        </div>
        <div class="memories_grid">
            <div class="memories_card zoom" id="zialibrary">
                <span><img src="/themes//olddata/assets/logo/zm.png" alt="Zia e Madinah" /></span>
                <h4>Zia Library</h4>
                <p>
                    <b>Z</b>iauddin <b>I</b>slamic <b>A</b>udio library contains 20,000+ media files accessible
                    in all major platforms.
                </p>
                <div class="availability">
                    <a href="https://apps.apple.com/us/app/zia-library-zia-e-madinah/id1454228192" target="_blank">
                        <i class="fa-brands fa-apple"></i>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.lakhana.ziaemadinah" target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                    <a href="https://ziaemadinah.com/" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a>
                    <!-- <i class="fa-solid fa-link"></i> -->
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="majmooaenaat">
                <span><img src="/themes//olddata/assets/logo/mn.png" alt="Majmooa e Naat" /></span>
                <h4>Majmooa e Naat</h4>
                <p>
                    Great multi-lingual library to read and share Islamic poetry lyrics.
                </p>
                <div class="availability">
                    <a href="https://apps.apple.com/us/app/majmooa-e-naat/id1454263650" target="_blank">
                        <i class="fa-brands fa-apple"></i>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.lakhana.majmooaenaat"
                       target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                    <a href="https://lakhana.com/site/majmooaenaat" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="iziarat">
                <span><img src="/themes//olddata/assets/logo/iziarat.png" alt="iZiarat" /></span>
                <h4>iZiarat</h4>
                <p>
                    Enhance your travel with iZiarat which provides a visual representation of all nearby places
                    drawn on a map.
                </p>
                <div class="availability">
                    <a href="https://apps.apple.com/us/app/iziarat/id1504726428" target="_blank">
                        <i class="fa-brands fa-apple"></i>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.lakhana.iziarat" target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                    <a href="http://iziarat.com/" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="elm-ul-adad">
                <span><img src="/themes//olddata/assets/logo/ea.png" alt="Elm ul Adad" /></span>
                <h4>Elm ul Adad</h4>
                <p>
                    Arabic & Urdu numerology calculator. A pocket tool for calculating Abjad count of any name. With
                    added functionality of finding Ism e Azam.
                    Our database has 150,000+ Ism e Azam combinations of 1, 2 or 3 Asma al Husnah.
                </p>
                <div class="availability">
                    <a href="https://play.google.com/store/apps/details?id=com.lakhana.elmuladaad" target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="time-sequence">
                <span><img src="/themes//olddata/assets/logo/timesequence.png" alt="Time Sequence" /></span>
                <h4>Time Sequence</h4>
                <p>
                    Timeline of all Islamic events in the past 1400+ years.
                    Our data dates back all the way to before Hijrah. You can jump to any year and see a
                    timeline of all events that occurred in that year. You can also see relations between events.
                </p>
                <div class="availability">
                    <!-- <a href="https://apps.apple.com/us/app/iziarat/id1504726428" target="_blank">
                        <i class="fa-brands fa-apple"></i>
                    </a> -->
                    <a href="https://play.google.com/store/apps/details?id=com.lakhana.timesequence"
                       target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                    <!-- <a href="http://iziarat.com/" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a> -->
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="true-quran">
                <span><img src="/themes//olddata/assets/logo/truequran.png" alt="True Quran" /></span>
                <h4>True Quran</h4>
                <p>
                    Recite Quran with transliteration, translation and tafsir with True Quran.
                </p>
                <div class="availability">
                    <a href="#" target="_blank">
                        <i class="fa-brands fa-apple"></i>
                    </a>
                    <a href="#"
                       target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                    <a href="#" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="whatsapp-direct">
                    <span><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                               alt="WhatsApp Direct" /></span>
                <h4>WhatsApp Direct</h4>
                <p>
                    Light-weight open-source Android app project through which you can directly send whatsapp
                    messages without saving their phone number.
                </p>
                <div class="availability">
                    <a href="https://bitbucket.org/mylakhana/whatsapp-direct/" target="_blank">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="https://bitbucket.org/mylakhana/whatsapp-direct/" target="_blank">Show
                    more</a> -->
            </div>
            <div class="memories_card zoom" id="hajj-wa-umrah">
                <span><img src="/themes//olddata/assets/logo/hajj.png" alt="Hajj wa Umrah" /></span>
                <h4>Hajj wa Umrah</h4>
                <p>
                    (Fatawa) Hajj wa Umrah is a unicode collection of Hajj and Umrah related masail taken from the
                    book "العُرْوَۃُ فِیْ مَنَاسِکِ الحَجِّ وَ العُمْرَۃ" written by Shaikh ul Hadees Allama Mufti
                    Muhammad Ata Ullah Naeemi. This app is owned by
                    Jamiat e Isha`t e Ahle Sunnat (Pakistan).
                </p>
                <div class="availability">
                    <a href="https://apps.apple.com/us/app/hajj-wa-umrah/id1513222734" target="_blank">
                        <i class="fa-brands fa-apple"></i>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.ishaateislam.hajjumrah"
                       target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="naat-academy">
                <span><img src="/themes//olddata/assets/logo/naatacademy.png" alt="Naat Academy" /></span>
                <h4>Naat Academy</h4>
                <p>
                    Feature-wise this app resembles a lot and is inspired by Majmooa e Naat while maintaining its
                    own uniqueness in design and content. This app is owned by Owais Razvi (AwesCreative) (India)
                </p>
                <div class="availability">
                    <a href="https://play.google.com/store/apps/details?id=com.app.naatacademy" target="_blank">
                        <i class="fa-brands fa-android"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="#" target="_blank">Show more</a> -->
            </div>
            <div class="memories_card zoom" id="sacredtraditions">
                <span><img src="/themes//olddata/assets/logo/sacredtraditions.png" alt="Sacred Traditions" /></span>
                <h4>Sacred Traditions</h4>
                <p>
                    Sacred Traditions brings you beautiful images of the beautiful Ahadith (Sacred Sayings) of the
                    most. We have translations in 40+ languages.
                </p>
                <div class="availability">
                    <a href="https://sacredtraditions.uk" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="https://sacredtraditions.uk" target="_blank">Show
                    more</a> -->
            </div>
            <div class="memories_card zoom" id="inheritance">
                <span><i class="fa-solid fa-calculator" style="color: #000000"></i></span>
                <h4>Inheritance Calculator</h4>
                <p>
                    Inheritance Calculator – your trusted online tool for precise and compliant inheritance
                    calculations in accordance with Sunni Islamic law. Create and share inheritance statements
                    seamlessly with your loved ones for transparency and peace of mind.
                </p>
                <div class="availability">
                    <a href="/inheritance" target="_blank">
                        <i class="fa-solid fa-desktop"></i>
                    </a>
                </div>
                <!-- <a class="show-more" href="https://sacredtraditions.uk" target="_blank">Show
                    more</a> -->
            </div>
        </div>
    </div>
</section>

<section class="section_container lounge_container">
    <div class="lounge_image">
        <img src="/themes//olddata/assets/code-01.jpg" alt="lounge" />
        <img src="/themes//olddata/assets/zm-01.jpg" alt="lounge" />
    </div>
    <div class="lounge_content">
        <h2 class="section_header">API Endpoints</h2>
        <div class="lounge_grid">
            <div class="lounge_details">
                <h4>City-wise Ziarat points</h4>
                <p>
                    Easily fetch lists of Ziarat places of any given city. It also includes ziarat type data.
                </p>
            </div>
            <div class="lounge_details">
                <h4>Fetch lyrics</h4>
                <p>
                    Fetch html-formatted lyrics of any Kalaam by its id.
                </p>
            </div>
            <div class="lounge_details">
                <h4>Media tracks search-engine</h4>
                <p>
                    Search by vocalist, album, location, keyword, or any other piece of inofmration tied with that
                    data.
                </p>
            </div>
            <div class="lounge_details">
                <h4>Fatawa Hajj wa Umrah</h4>
                <p>
                    Fetch and display Hajj wa Umrah fatawa in your website through our API endpoint.
                </p>
            </div>
        </div>
    </div>
</section>

<section class="section_container travellers_container" id="team">
    <h2 class="section_header">Meet the geniuses</h2>
    <div class="travellers_grid">
        <div class="travellers_card">
            <img class="profile_pic" src="/themes//olddata/assets/programmer-2.jpg" alt="traveller" />
            <div class="travellers_card_content">
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://wa.me/923122370660&size=500x500"
                     alt="WhatsApp: Yawar">
                <!-- <img src="/themes//olddata/assets/client-3.jpg" alt="client" /> -->
                <h4><a class="url" href="https://wa.me/923122370660">Yawar Younus Lakhana</a></h4>
                <p>Madinah, KSA</p>
            </div>
        </div>
        <div class="travellers_card">
            <img class="profile_pic" src="/themes//olddata/assets/programmer-1.jpg" alt="traveller" />
            <div class="travellers_card_content">
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=mailto:mubashirlakhana@gmail.com&size=500x500"
                     alt="Email: Mubashir">
                <!-- <img src="/themes//olddata/assets/client-4.jpg" alt="client" /> -->
                <h4><a class="url" href="mailto:mubashirlakhana@gmail.com">Mubashir Younus Lakhana</a></h4>
                <p>Madinah, KSA</p>
            </div>
        </div>
    </div>

    <div class="blockquote-wrapper">
        <div class="blockquote">
            <h1>
                Ready to turn your vision into reality? Let's make it happen together. Explore our expertise and connect with us on
                <a href="https://www.fiverr.com/s/ZqbKv8" target="_blank">
                    <span><u>Fiverr</u></span>
                </a>
                to bring your project to life!

            </h1>
            <h4>Empower your dreams</h4>
        </div>
    </div>

</section>


<section class="section_container booking_container" id="downloads">
    <h2 class="section_header">Download links</h2>
    <p class="description">
        Visit these stores to download our mobile app projects.
    </p>

    <div class="downloads_section">
        <center>
            <a href="https://apps.apple.com/us/developer/yawar-younus/id1454228191" target="_blank"
               class="market-btn apple-btn" role="button">
                <span class="market-button-subtitle">Download on the</span>
                <span class="market-button-title">App Store</span>
            </a>

            <a href="https://play.google.com/store/apps/developer?id=Lakhana+Creations" target="_blank"
               class="market-btn google-btn" role="button">
                <span class="market-button-subtitle">Download on the</span>
                <span class="market-button-title">Google Play</span>
            </a>
        </center>
    </div>
</section>

<section class="subscribe" hidden>
    <div class="section_container subscribe_container">
        <h2 class="section_header">Subscribe newsletter & get latest news</h2>
        <form class="subscribe_form">
            <input type="text" placeholder="Enter your email here" />
            <button class="btn">Subscribe</button>
        </form>
    </div>
</section>

