/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { atom } from 'jotai';

export const curPointAtom = atom<number>(0);
export const curEnergyAtom = atom<number>(0);
export const tapsAtom = atom<number>(0)