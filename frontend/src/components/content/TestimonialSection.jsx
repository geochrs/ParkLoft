import classes from './TestimonialSection.module.css';
import { useState } from 'react';

export function TestimonialSection() {
  const [activeId, setActiveId] = useState('content1');

  const testimonials = [
    {
      id: 'content1',
      name: 'Milton Austin',
      title: 'Marketing Director, UrbanSpaces Inc',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      heading: 'No More Parking Headaches',
      content: [
        'Finding parking near my office used to be a nightmare. With this platform, I can reserve a spot ahead of time and just focus on my day.',
        'The peace of mind it gives me is seriously underrated. Total game changer for city life!',
      ],
    },
    {
      id: 'content2',
      name: 'Milton Austin',
      title: 'Product Manager, DriveTech Solutions',
      img: 'https://randomuser.me/api/portraits/men/78.jpg',
      heading: 'Smooth, Simple, Reliable',
      content: [
        'I use the app almost daily. It’s fast, the interface is clean, and it’s never let me down.',
        'Knowing exactly where I’m going to park before I even leave the house? That’s priceless.',
      ],
    },
    {
      id: 'content3',
      name: 'Milton Austin',
      title: 'Event Coordinator, LiveLocal Events',
      img: 'https://randomuser.me/api/portraits/men/22.jpg',
      heading: 'Saved Me in a Pinch',
      content: [
        'I had to get to a last-minute event downtown and couldn’t risk being late. Found a spot two blocks from the venue—booked in seconds.',
        'Honestly, I don’t know how I managed without this before. Highly recommended!',
      ],
    },
  ];

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2 className={classes.h2}>What Our Clients Say.</h2>
        <div className={classes.cards}>
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`${classes.card} ${
                activeId === item.id ? classes.active : ''
              }`}
              onClick={() => setActiveId(item.id)}
            >
              <img src={item.img} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.content}>
          {testimonials
            .filter((item) => item.id === activeId)
            .map((item) => (
              <div key={item.id} className={classes.contentBox}>
                <div className={classes.text}>
                  <h2>{item.heading}</h2>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#eca633"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.848L19.335 24 12 20.018 4.665 24 6 15.598 0 9.75l8.332-1.595z" />
                    </svg>
                  ))}
                  {item.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
