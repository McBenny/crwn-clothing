import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles"

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google',
  inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
}

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType)
  return <CustomButton {...otherProps}>{children}</CustomButton>
  // let button
  // switch (buttonType) {
  //   case BUTTON_TYPE_CLASSES.google:
  //     button = (
  //       <GoogleSignInButton {...otherProps}>{children}</GoogleSignInButton>
  //     );
  //     break;
  //   case BUTTON_TYPE_CLASSES.inverted:
  //     button = <InvertedButton {...otherProps}>{children}</InvertedButton>;
  //     break;
  //   default:
  //     button = <BaseButton {...otherProps}>{children}</BaseButton>;
  // }
  // return button
}

export default Button