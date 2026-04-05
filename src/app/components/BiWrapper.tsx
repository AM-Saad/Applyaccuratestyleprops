import Bi from "../../imports/Bi/Bi";

// This wrapper adds global CSS overrides to fix font weights in the table
export function BiWrapper() {
  return (
    <>
      <style>{`
        /* Override table row name font weight to Regular instead of Medium */
        [data-name="Row"] p[class*="font-['Satoshi:Medium'"][class*="text-[14px]"][class*="top-[19px]"] {
          font-family: 'Satoshi:Regular', sans-serif !important;
          font-weight: 400 !important;
        }

        /* Ensure proper font loading */
        @font-face {
          font-family: 'Satoshi:Regular';
          font-weight: 400;
          font-style: normal;
        }

        @font-face {
          font-family: 'Satoshi:Medium';
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: 'Satoshi:Bold';
          font-weight: 700;
          font-style: normal;
        }
      `}</style>
      <Bi />
    </>
  );
}
