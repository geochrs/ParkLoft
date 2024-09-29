import classes from './HeroSection.module.css';

export default function HeroSection({ title, imageSrc, children }) {
  return (
    <section className={classes.section}>
      <div className={classes['left-content']}>
        <h1 className={classes.h1}>{title}</h1>
        <div className={classes.content}>{children}</div>
      </div>
      <div className={classes['img-container']}>
        <img className={classes.img} src={imageSrc} alt={title} />
      </div>
    </section>
  );
}
