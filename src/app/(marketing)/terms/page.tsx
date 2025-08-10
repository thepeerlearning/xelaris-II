import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="w-full min-h-[80px] md:min-h-[100vh] grid grid-cols-1 relative bg-[#1D1F24] pt-[60px] md:pt-[120px]">
      <div className="w-full max-w-[1320px] mx-auto h-[55px] bg-[#1D1F24] place-content-center px-8">
        <div className="w-full max-w-[690px] flex gap-2 items-center">
          <Link
            href="/"
            className="text-white text-xs/[18px] font-bold font-inter"
          >
            Home
          </Link>
          <span className="text-white text-xs/[18px] font-normal font-inter">
            /
          </span>
          <h4 className="text-white text-xs/[18px] font-bold font-inter">
            Terms and condition
          </h4>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center pb-0 sm:pb-12 xxl:pb-24 pt-[72px]">
        <div className="w-full max-w-[1366px] sm:min-h-[438px] flex flex-col xl:flex-row justify-center items-center px-2 md:px-0">
          <div className="w-full h-full max-w-[869px] rounded-[32px] bg-[linear-gradient(180deg,_#051A2C_0%,_#051A2C_100%)] pb-2 flex flex-col gap-8 justify-center ">
            <div className="bg-[#1D1F24] w-full h-full p-6 py-12 border-t border-white rounded-[12px_12px_30px_30px] flex justify-center items-center">
              <div className=" max-w-[737px] flex flex-col gap-8">
                <h4 className="font-inter font-bold text-[33.6px]/[40.32px] text-white text-left">
                  Terms and condition
                </h4>
                <p className="w-full flex flex-col gap-6 font-inter font-normal text-sm md:text-base text-left text-white">
                  At Xelaris, we are committed to helping students learn coding
                  effectively. Success in coding education requires COMMITMENT,
                  CONSISTENCY, and DEDICATION. We&apos;ve found that students
                  typically begin showing significant progress after
                  approximately 6 months of consistent learning. Therefore, we
                  recommend a minimum commitment of six (6) months enrollment.
                  <span>
                    By enrolling in our program, you agree to the following
                    terms:
                  </span>
                  <span className="font-bold">
                    {" "}
                    1. Enrollment and Payment Policies{" "}
                  </span>
                  <span>
                    <ul>
                      <li>
                        1.1 First Month Payment: The first payment is required
                        at the time of enrollment. This payment is
                        non-refundable and non-transferable.
                      </li>
                      <li>
                        1.2 Membership Activation: Membership begins on the
                        sign-up date. Monthly payments will be auto-drafted on
                        the same date each month unless otherwise stated.
                      </li>
                      <li>
                        1.3 Payment Methods: The first payment must be made via
                        a credit/debit card.
                      </li>
                    </ul>
                  </span>
                  <span className="font-bold">
                    2. Cancellation and Membership Hold{" "}
                  </span>
                  <span>2.1 Cancellation Notice:</span>
                  <span>
                    <ul>
                      <li>
                        <span className="font-bold text-2xl mr-2">&bull;</span>
                        Monthly memberships require a 30-day written notice to
                        <Link href="mailto:hello@xelaris.co" target="_blank">
                          hello@xelaris.co
                        </Link>{" "}
                        to cancel.
                      </li>{" "}
                      <li>
                        <span className="font-bold text-2xl mr-2">&bull;</span>
                        Prepaid memberships require a 30-day written notice to
                        cancel.
                      </li>
                      <li>
                        <span className="font-bold text-2xl mr-2">&bull;</span>
                        Termination requests must include &quot;Membership
                        Cancellation&quot; in the subject line.
                      </li>
                    </ul>
                  </span>
                  <span className="font-bold">3. Refunds and Changes</span>
                  <span className="flex flex-col gap-1">
                    <span>
                      3.1 Non-Refundable Payments: Membership fees, once
                      drafted, are non-refundable under any circumstances.
                    </span>
                    <span>
                      3.2 Upgrades and Downgrades:
                      <ul>
                        <li>
                          <span className="font-bold text-2xl mr-2">
                            &bull;
                          </span>{" "}
                          Upgrades to higher-tier memberships can be made
                          without fees.
                        </li>
                        <li>
                          <span className="font-bold text-2xl mr-2">
                            &bull;
                          </span>{" "}
                          Downgrades are , including registration and
                          cancellation fees.
                        </li>
                      </ul>
                    </span>
                  </span>
                  <span className="font-bold">
                    4. Automatic Renewal and Price Changes{" "}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span>
                      4.1 Renewal: All monthly memberships automatically renew
                      unless canceled per the terms above.
                    </span>
                    <span>
                      4.2 Price Changes: Members will receive a 30-day notice of
                      any price increase via email.
                    </span>
                  </span>
                  <span className="font-bold">
                    5. Attendance and Class Rescheduling
                  </span>
                  <span className="flex flex-col gap-1">
                    <span>
                      5.1 Class Schedule: Schedules are subject to change.
                      Xelaris will make reasonable efforts to notify members of
                      adjustments.
                    </span>
                    <span>
                      5.2 Missed Classes: Classes missed due to student absence
                      are non-refundable. Rescheduling must be requested at
                      least 24 hours in advance.
                    </span>
                  </span>
                  <span className="font-bold">6. Conduct and Behavior</span>
                  <span className="flex flex-col gap-1">
                    <span>
                      6.1 Student Expectations: Students are expected to
                      participate respectfully, follow instructions, and avoid
                      disrupting sessions.
                    </span>
                    <span>
                      6.2 Termination for Misconduct: Xelaris reserves the right
                      to terminate membership after verbal and written warnings
                      if a student&apos;s behavior remains disruptive.
                    </span>
                  </span>
                  <span className="font-bold">
                    7. Data Privacy and Communication
                  </span>
                  <span className="flex flex-col gap-1">
                    <span>
                      7.1 Member Information: All personal and payment data will
                      be stored securely and used solely for membership
                      purposes.
                    </span>
                    <span>
                      7.2 Communication: It is the member&apos;s responsibility
                      to ensure all communication from Xelaris is received and
                      acknowledged, particularly regarding membership changes or
                      cancellations.
                    </span>
                  </span>
                  <span className="font-bold">8. Liability and Waivers</span>
                  <span className="flex flex-col gap-1">
                    <span>
                      8.1 Learning Goals: While Xelaris is committed to helping
                      students achieve success, we cannot guarantee specific
                      outcomes or skill levels.
                    </span>
                    <span>
                      8.2 Liability: Xelaris is not liable for any technical
                      issues or disruptions beyond its control, such as internet
                      outages during online classes.
                    </span>
                  </span>
                  <span className="font-bold">9. Discounts</span>
                  <span className="flex flex-col gap-1">
                    <span>
                      9.1 Family Discount: Families enrolling multiple children
                      are eligible for a 10% discount per additional child after
                      the first.
                    </span>
                    <span>
                      9.2 Annual Payment Discount: A 15% discount is available
                      for families opting to pay the full annual tuition
                      upfront.
                    </span>
                  </span>
                  <span>
                    For questions or concerns, please contact us at{" "}
                    <Link href="mailto:hello@xelaris.co" target="_blank">
                      hello@xelaris.co.
                    </Link>{" "}
                    Thank you for choosing Xelaris to guide your child&apos;s
                    coding journey!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
