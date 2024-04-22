import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

interface ColorModeSwitcherProps extends Omit<IconButtonProps, "icon"> {}

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      zIndex={"overlay"}
      variant="ghost"
      color="current"
      pos={"fixed"}
      top={4}
      right={4}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
