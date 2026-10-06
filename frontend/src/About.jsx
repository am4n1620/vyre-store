import React from "react";

function About() {
    return (
        <section className="about-section" id="about">

            {/* ABOUT HERO */}

            <div className="about-hero">

                <p className="about-label">
                    THE MYBUSINESS EXPERIENCE
                </p>

                <h2>
                    MORE THAN
                    <br />
                    <span>STYLE.</span>
                </h2>

                <p className="about-intro">
                    We create a collection for people who want
                    their style to stand out.
                </p>

            </div>


            {/* OUR STORY */}

            <div className="about-story">

                <div className="about-story-title">
                    <p>01 — OUR STORY</p>
                </div>

                <div className="about-story-content">

                    <h3>
                        BUILT FOR
                        <br />
                        <span>YOUR STYLE.</span>
                    </h3>

                    <p>
                        MYBUSINESS is built around one simple idea:
                        your style should feel like you.
                    </p>

                    <p>
                        From perfumes and caps to hats, sunglasses
                        and printed socks, our collection brings
                        together products designed to add something
                        different to your everyday look.
                    </p>

                    <p>
                        We combine modern design, bold ideas and
                        quality products to create an experience
                        that feels different from ordinary shopping.
                    </p>

                </div>

            </div>


            {/* VALUES */}

            <div className="about-values">

                <div className="about-value">
                    <span>01</span>
                    <h3>BOLD</h3>
                    <p>
                        Products that are made to get noticed.
                    </p>
                </div>

                <div className="about-value">
                    <span>02</span>
                    <h3>MODERN</h3>
                    <p>
                        Clean designs with a fresh visual identity.
                    </p>
                </div>

                <div className="about-value">
                    <span>03</span>
                    <h3>QUALITY</h3>
                    <p>
                        A collection selected with quality in mind.
                    </p>
                </div>

                <div className="about-value">
                    <span>04</span>
                    <h3>YOU</h3>
                    <p>
                        Because the best style is your own style.
                    </p>
                </div>

            </div>


            {/* FINAL CTA */}

            <div className="about-cta">

                <p>
                    FIND YOUR NEXT LOOK.
                </p>

                <h3>
                    WEAR YOUR
                    <br />
                    <span>STYLE.</span>
                </h3>

                <a href="#collection">
                    EXPLORE COLLECTION →
                </a>

            </div>

        </section>
    );
}

export default About;