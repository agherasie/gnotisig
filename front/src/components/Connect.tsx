import { useToast, Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AdenaService } from "../services/adena/adena";
import { IAccountInfo } from "../services/adena/adena.types";
import { useAccountStore } from "../store";

const ConnectButton: FC = () => {
  const toast = useToast();
  const { setChainID, setAddress } = useAccountStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [accountInfo, setAccountInfo] = useState<IAccountInfo | null>(null);

  const fetchBalance = async () => {
    const accountInfo = await AdenaService.getAccountInfo();
    setAccountInfo(accountInfo);
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);

    try {
      // Attempt to establish a connection
      await AdenaService.establishConnection("gnotisig");

      // Get the account info
      const info: IAccountInfo = await AdenaService.getAccountInfo();

      // Make sure the network is valid
      await AdenaService.switchNetwork("dev");

      // Update the account context
      setAddress(info.address);
      setChainID("dev");

      await fetchBalance();

      toast({
        colorScheme: "purple",
        title: "Connected to Adena",
        description: `Connected to ${info.address}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);

      toast({
        title: "Failed to connect to Adena",
        description: "Please make sure you have the Adena wallet installed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };
  return (
    <Button
      _hover={{ bg: "#373737", color: "#808080" }}
      bg="#808080"
      color="white"
      onClick={handleWalletConnect}
      isLoading={isLoading}
      isDisabled={!!accountInfo}
    >
      Connect wallet
    </Button>
  );
};

export default ConnectButton;
