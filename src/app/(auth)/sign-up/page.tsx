import { Card } from "~/components/ui/card";
import { CreateAccount } from "../_components/create-account";
import { OTPVerification } from "../_components/otp-verfication";

const SignupPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const { token } = searchParams;

  return (
    <Card className="mx-auto max-w-lg pb-10">
      {token ? <OTPVerification /> : <CreateAccount />}
    </Card>
  );
};

export default SignupPage;
