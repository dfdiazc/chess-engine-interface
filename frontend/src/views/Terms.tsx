import { Header } from "components";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="h-full overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Helmet>
                <style>{"body {background-color: #1C2021}"}</style>
              </Helmet>
              <Header />
            </div>
            <div className="flex justify-center shrink-0 relative p-10">
              <div className="flex flex-col mt-16 max-w-screen-lg">
                <h1 className="font-roboto font-bold text-center text-white text-5xl">
                  Un-Real Chess Terms of Service
                </h1>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  1. Terms
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  By accessing Un-Real Chess, accessible from
                  unrealchess.web.app, you are agreeing to be bound by these
                  Website Terms and Conditions of Use and agree that you are
                  responsible for the agreement with any applicable local laws.
                  If you disagree with any of these terms, you are prohibited
                  from accessing this site. The materials contained in this
                  Website are protected by copyright and trade mark law.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  2. Use License
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  Permission is granted to temporarily download one copy of the
                  materials on unrealchess.web.app's Website for personal,
                  non-commercial transitory viewing only. This is the grant of a
                  license, not a transfer of title, and under this license you
                  may not:
                </p>
                <ul className="font-roboto font-light text-start text-white text-base">
                  <li>modify or copy the materials;</li>
                  <li>
                    use the materials for any commercial purpose or for any
                    public display;
                  </li>
                  <li>
                    attempt to reverse engineer any software contained on
                    unrealchess.web.app's Website;
                  </li>
                  <li>
                    remove any copyright or other proprietary notations from the
                    materials; or
                  </li>
                  <li>
                    transferring the materials to another person or "mirror" the
                    materials on any other server.
                  </li>
                </ul>
                <p className="font-roboto font-light text-start text-white text-base">
                  This will let unrealchess.web.app to terminate upon violations
                  of any of these restrictions. Upon termination, your viewing
                  right will also be terminated and you should destroy any
                  downloaded materials in your possession whether it is printed
                  or electronic format.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  3. Disclaimer
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  All the materials on unrealchess.web.app’s Website are
                  provided "as is". unrealchess.web.app makes no warranties, may
                  it be expressed or implied, therefore negates all other
                  warranties. Furthermore, unrealchess.web.app does not make any
                  representations concerning the accuracy or reliability of the
                  use of the materials on its Website or otherwise relating to
                  such materials or any sites linked to this Website.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  4. Limitations
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  unrealchess.web.app or its suppliers will not be hold
                  accountable for any damages that will arise with the use or
                  inability to use the materials on unrealchess.web.app’s
                  Website, even if unrealchess.web.app or an authorize
                  representative of this Website has been notified, orally or
                  written, of the possibility of such damage. Some jurisdiction
                  does not allow limitations on implied warranties or
                  limitations of liability for incidental damages, these
                  limitations may not apply to you.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  5. Revisions and Errata
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  The materials appearing on unrealchess.web.app’s Website may
                  include technical, typographical, or photographic errors.
                  unrealchess.web.app will not promise that any of the materials
                  in this Website are accurate, complete, or current.
                  unrealchess.web.app may change the materials contained on its
                  Website at any time without notice. unrealchess.web.app does
                  not make any commitment to update the materials.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  6. Links
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  unrealchess.web.app has not reviewed all of the sites linked
                  to its Website and is not responsible for the contents of any
                  such linked site. The presence of any link does not imply
                  endorsement by unrealchess.web.app of the site. The use of any
                  linked website is at the user’s own risk.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  7. Site Terms of Use Modifications
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  unrealchess.web.app may revise these Terms of Use for its
                  Website at any time without prior notice. By using this
                  Website, you are agreeing to be bound by the current version
                  of these Terms and Conditions of Use.
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  8. Your Privacy
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  Please read our{" "}
                  <Link
                    to="/privacy"
                    className="text-blue-500 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <h2 className="mt-10 font-roboto font-bold text-start text-flamingo-100 text-lg">
                  9. Governing Law
                </h2>
                <p className="font-roboto font-light text-start text-white text-base">
                  Any claim related to unrealchess.web.app's Website shall be
                  governed by the laws of co without regards to its conflict of
                  law provisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
