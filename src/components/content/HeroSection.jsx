import classes from './HeroSection.module.css';

export default function HeroSection({ title, imageSrc, children }) {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes['left-content']}>
          <h1 className={classes.h1}>{title}</h1>
          <div className={classes.content}>{children}</div>
        </div>
        <div className={classes['img-container']}>
          <img className={classes.img} src={imageSrc} alt={title} />
        </div>
      </div>
      <div className={classes.decorBottom}></div>
      <div className={classes.scrollDown}>
        <svg
          width="6"
          height="39"
          viewBox="0 0 6 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-ani="fade-up"
          style={{ opacity: 1, transform: 'translate(0px, 0px)' }}
        >
          <rect width="6" height="6" fill="#5469E7" className={classes.dot1} />
          <rect y="11" width="6" height="6" fill="#5469E7" className={classes.dot2} />
          <rect y="22" width="6" height="6" fill="#5469E7" className={classes.dot3} />
          <rect y="33" width="6" height="6" fill="#5469E7" className={classes.dot4} />
        </svg>
      </div>
    </section>
  );
}
