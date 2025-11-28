import './StackSection.css';

export const StackSection = () => {
    const stack = ['Typescript', 'React', 'CSS', 'HTML'];
    const libraries = ['Zustand', '3JS', 'GSAP', 'Framer Motion'];

    return (
        <section className='section stack-section'>
            <div className='stack-container'>
                <div className='stack'>
                    <h3 style={{ textAlign: 'center' }}>Stack:</h3>
                    <div className='stack-grid'>
                        {stack.map((val, idx) => (
                            <div className='stack-element' key={idx}>
                                <h4>{val}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='stack'>
                    <h3 style={{ textAlign: 'center' }}>Libraries:</h3>
                    <div className='stack-grid'>
                        {libraries.map((val, idx) => (
                            <div className='stack-element' key={idx}>
                                <h4>{val}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr />
        </section>
    );
};
