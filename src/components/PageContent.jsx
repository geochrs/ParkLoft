import classes from './PageContent.module.css';

export default function PageContent({ title, imageSrc, children }) {
  return (
    <section className={classes.section}>
      <h1 className={classes.h1}>{title}</h1>
      <div>
        <img className={classes.img} src={imageSrc} alt={title} />
      </div>
      <div className={classes.content}>{children}</div>
      <p>dsadasdasd</p>
    </section>
  );
}
