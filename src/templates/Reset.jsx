import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
      <div>
        <TextInput
          fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
        />
      </div>
      <div className="center">
        <div className="module-spacer--medium"></div>
        <PrimaryButton
          label={"Reset Password"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium"></div>
        <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
      </div>
    </div>
  );
}

export default Reset;