import React from "react";

function FireBackground() {
    const embers = Array.from({ length: 80 }, (_, index) => index);

    return (
        <div className="fire-background">

            {/* Large moving fire glows */}
            <div className="fire-orb fire-orb-1"></div>
            <div className="fire-orb fire-orb-2"></div>
            <div className="fire-orb fire-orb-3"></div>
            <div className="fire-orb fire-orb-4"></div>

            {/* Heat waves */}
            <div className="fire-wave fire-wave-1"></div>
            <div className="fire-wave fire-wave-2"></div>
            <div className="fire-wave fire-wave-3"></div>

            {/* Rising embers */}
            <div className="fire-embers">
                {embers.map((ember) => (
                    <span
                        key={ember}
                        className="fire-ember"
                        style={{
                            "--ember-x": `${(ember * 37) % 100}%`,
                            "--ember-delay": `${(ember % 20) * -0.35}s`,
                            "--ember-duration": `${4 + (ember % 6)}s`,
                            "--ember-size": `${2 + (ember % 4)}px`,
                        }}
                    />
                ))}
            </div>

            {/* Bottom fire atmosphere */}
            <div className="fire-floor"></div>

            {/* Dark cinematic overlay */}
            <div className="fire-vignette"></div>
        </div>
    );
}

export default FireBackground;