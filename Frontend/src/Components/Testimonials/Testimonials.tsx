import { useEffect, useRef } from "react";
import "./testimonials.css";
import Testimonial from "../Common Components/Testimonial/Testimonial";

export default function Testimonials() {
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const scrollInterval = useRef<number | null>(null);

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  const startScrolling = () => {
    if (scrollInterval.current !== null) return;

    const testimonial = testimonialRef.current;
    if (!testimonial) return;

    scrollInterval.current = window.setInterval(() => {
      if (
        testimonial.scrollLeft + testimonial.clientWidth <
        testimonial.scrollWidth
      ) {
        testimonial.scrollLeft += 1;
      } else {
        testimonial.scrollLeft = 0;
      }
    }, 15);
  };

  const stopScrolling = () => {
    if (scrollInterval.current !== null) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  return (
    <div className="testimonials-container">
      <div className="title-container">
        <div className="title">Testimonials</div>
        <div className="description">See what our customers say about us!</div>
      </div>
      <div
        className="testimonials"
        id="testimonial"
        ref={testimonialRef}
        onMouseEnter={stopScrolling} // Completely stops scrolling
        onMouseLeave={startScrolling} // Resumes scrolling
      >
        <Testimonial
          author="Lisa"
          description="I’ll start with what could be changed… I think you should state what ingredients are in the serum on your website because of allergies etc and the serum bottle was a little stiff when I first started using it but it is better now. For the products the self I cannot wrong. MY GOD the skin serum is goood. I had pigmentation and dry skin, dermatitis also. Pretty much gone in 2 weeks. The oil is thick but absorbs instantly. I just hope the little things on your website are sorted. Toner is amazing and hair serum I’ll be back to review."
        />
        <Testimonial
          author="Sara"
          description="Best products I’ve ever used! The hair serum has made my hair shine – it feels thicker, healthier and smoother. My skin was glowing after first using the skin serum. After a couple weeks of using it, I can truly see a difference. Any pigmentation and scarring I on my skin has decreased significantly, and the texture of my skin had also improved. The toner is also amazing – it’s gentle on the skin unlike so many other toners I have used."
        />
        <Testimonial
          author="Sarah"
          description="Best products I’ve ever used! The hair serum has made my hair shine – it feels thicker, healthier and smoother. My skin was glowing after first using the skin serum. After a couple weeks of using it, I can truly see a difference. Any pigmentation and scarring I on my skin has decreased significantly, and the texture of my skin had also improved. The toner is also amazing – it’s gentle on the skin unlike so many other toners I have used."
        />
        <Testimonial
          author="Sarah"
          description="Best products I’ve ever used! The hair serum has made my hair shine – it feels thicker, healthier and smoother. My skin was glowing after first using the skin serum. After a couple weeks of using it, I can truly see a difference. Any pigmentation and scarring I on my skin has decreased significantly, and the texture of my skin had also improved. The toner is also amazing – it’s gentle on the skin unlike so many other toners I have used."
        />
        <Testimonial
          author="Sarah"
          description="Best products I’ve ever used! The hair serum has made my hair shine – it feels thicker, healthier and smoother. My skin was glowing after first using the skin serum. After a couple weeks of using it, I can truly see a difference. Any pigmentation and scarring I on my skin has decreased significantly, and the texture of my skin had also improved. The toner is also amazing – it’s gentle on the skin unlike so many other toners I have used."
        />
        <Testimonial
          author="Sarah"
          description="Best products I’ve ever used! The hair serum has made my hair shine – it feels thicker, healthier and smoother. My skin was glowing after first using the skin serum. After a couple weeks of using it, I can truly see a difference. Any pigmentation and scarring I on my skin has decreased significantly, and the texture of my skin had also improved. The toner is also amazing – it’s gentle on the skin unlike so many other toners I have used."
        />
      </div>
    </div>
  );
}
