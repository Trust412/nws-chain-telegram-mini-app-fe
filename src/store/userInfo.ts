/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { atom, useAtom } from 'jotai';

export const userIDAtom = atom<string>("6739845345345");
export const userFirstNameAtom = atom<string>("NWS")
export const userLastNameAtom = atom<string>("Test")
export const userNameAtom = atom<string>("")
export const startParamAtom = atom<string>("")