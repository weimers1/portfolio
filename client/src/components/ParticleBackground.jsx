import '../css/particle-background.scss';

function ParticleBackground() {
    return (
        <div className="particle-container">
            {Array.from(
                { length: Math.floor(Math.random() * (50 - 21) + 20) },
                (_, index) => (
                    <div
                        key={index}
                        className="particle"
                    ></div>
                )
            )}
        </div>
    );
}

export default ParticleBackground;
