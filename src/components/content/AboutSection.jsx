import classes from './AboutSection.module.css';

export default function AboutSection({ title, children }) {
  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>{title}</h2>
      <div className={classes.content}>{children}</div>
    </section>
  );
}
