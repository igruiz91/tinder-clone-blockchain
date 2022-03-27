/* eslint-disable react/prop-types */
import React from "react";
import { useState, createContext, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useMoralis } from "react-moralis";

export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
  const { authenticate, isAuthenticated, user, Moralis } = useMoralis();
  const [cardsData, setCardsData] = useState([]);
  const [currentAccount, setCurrentAccount] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    checkWalletConnection();
    if (isAuthenticated) {
      requestUsersData(user.get("ethAddress"));
      requestCurrentUserData(user.get("ethAddress"));
    }
  }, [isAuthenticated]);

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = user.get("ethAddress");
      setCurrentAccount(address);
      requestToCreateUserProfile(address, faker.name);
    } else setCurrentAccount("");
  };

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: "Log in using Moralis",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = async () => {
    await Moralis.User.logOut();
    setCurrentAccount("");
  };

  const requestToCreateUserProfile = async (walletAddress, name) => {
    try {
      await fetch(`/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const requestCurrentUserData = async (walletAddress) => {
    try {
      const response = await fetch(
        `/api/fetchCurrentUserData?activeAccount=${walletAddress}`,
      )
      const {data} = await response.json()

      setCurrentUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const requestUsersData = async (activeAccount) => {
    try {
      const response = await fetch(
        `/api/fetchUsers?activeAccount=${activeAccount}`
      );
      const {data} = await response.json()

      setCardsData(data);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TinderContext.Provider
      value={{ cardsData, connectWallet, disconnectWallet, currentAccount, currentUser }}
    >
      {children}
    </TinderContext.Provider>
  );
};