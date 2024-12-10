import classes from './TosPage.module.css';
import { Link } from 'react-router-dom';
export default function TosPage() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <button className={classes.backButton}>
          <span className={classes.backIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <Link to="/">Back</Link>
        </button>
        <h1>Terms and Conditions</h1>
        <div>
          1. Introduction <br />
          By using ParkLoft you confirm your acceptance of, and agree to be
          bound by, these terms and conditions.
          <br />
          <br />
          2. Agreement to Terms and Conditions
          <br /> This Agreement takes effect on the date on which you first use
          the ParkLoft application.
          <br />
          <br />
          3. Unlimited Access Software License with Termination Rights The
          ParkLoft Software License facilitates the acquisition of
          ParkLoftsoftware through a single purchase, granting users
          unrestricted and perpetual access to its comprehensive
          functionalities. Tailored for independent creators, entrepreneurs, and
          small businesses, ParkLoftempowers users to create compelling web
          pages and online portfolios. <br />
          This license entails a straightforward and flexible arrangement,
          exempting users from recurring fees or subscriptions. However, it is
          important to acknowledge that the licensor retains the right to
          terminate the license without conditions or prerequisites. This
          termination provision enables the licensor to exercise control over
          software distribution and utilization.
          <br /> Opting for the ParkLoft Software License enables users to enjoy
          the benefits of the software while recognizing the licensor's
          unrestricted termination rights, which provide adaptability and
          address potential unforeseen circumstances.
          <br />
          <br />
          4. Refunds
          <br /> Due to the nature of digital products, the ParkLoft boilerplate
          cannot be refunded or exchanged once access is granted.
          <br />
          <br />
          5. Disclaimer
          <br /> It is not warranted that ParkLoft will meet your requirements
          or that its operation will be uninterrupted or error free. All express
          and implied warranties or conditions not stated in this Agreement
          (including without limitation, loss of profits, loss or corruption of
          data, business interruption or loss of contracts), so far as such
          exclusion or disclaimer is permitted under the applicable law are
          excluded and expressly disclaimed. This Agreement does not affect your
          statutory rights.
          <br />
          <br />
          6. Warranties and Limitation of Liability
          <br /> ParkLoft does not give any warranty, guarantee or other term as
          to the quality, fitness for purpose or otherwise of the software.
          ParkLoftshall not be liable to you by reason of any representation
          (unless fraudulent), or any implied warranty, condition or other term,
          or any duty at common law, for any loss of profit or any indirect,
          special or consequential loss, damage, costs, expenses or other claims
          (whether caused by ParkLoft's negligence or the negligence of its
          servants or agents or otherwise) which arise out of or in connection
          with the provision of any goods or services by ParkLoft. ParkLoft
          shall not be liable or deemed to be in breach of contract by reason of
          any delay in performing, or failure to perform, any of its obligations
          if the delay or failure was due to any cause beyond its reasonable
          control. Notwithstanding contrary clauses in this Agreement, in the
          event thatParkLoft are deemed liable to you for breach of this
          Agreement, you agree that ParkLoft's liability is limited to the
          amount actually paid by you for your services or software, which
          amount calculated in reliance upon this clause. You hereby release
          ParkLoft from any and all obligations, liabilities and claims in
          excess of this limitation.
          <br />
          <br />
          7. Responsibilities
          <br /> ParkLoft is not responsible for what the user does with the
          user-generated content.
          <br />
          <br />
          8. Price Adjustments <br /> As we continue to improve ParkLoft and
          expand our offerings, the price may increase. The discount is provided
          to help customers secure the current price without being surprised by
          future increases.
          <br />
          <br />
          9. General Terms and Law
          <br /> This Agreement is governed by the laws of Singapore. You
          acknowledge that no joint venture, partnership, employment, or agency
          relationship exists between you and ParkLoft as a result of your use
          of these services. You agree not to hold yourself out as a
          representative, agent or employee of ParkLoft. You agree that ParkLoft
          will not be liable by reason of any representation, act or omission to
          act by you.
          <br />
          <br />
          Last updated: 12 November 2024.
        </div>
      </div>
    </section>
  );
}
