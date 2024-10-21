/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Image from "next/image";
import Primarybutton from "../button/primaryButton";
import { useEffect, useState } from "react";
import { QuestData } from "@/app/quest/page";
import axios from "axios";
import { useAtom } from "jotai";
import { userIDAtom } from "@/store/userInfo";
import { verificationData } from "@/data/verification";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerificationModal({
  isOpen = true,
  onClose,
}: VerificationModalProps) {
  const [userID] = useAtom(userIDAtom);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  const [getData, setgetData] = useState<QuestData>();
  // let getdata: GetData | undefined = undefined;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<QuestData>(
          `https://b702-52-68-113-84.ngrok-free.app/api/get-task-data/${userID}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "rio",
            },
          }
        );
        setgetData(response.data);
        // console.log("sdf", response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  "></div>;
  if (error)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        Error: {error}
      </div>
    );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-indigo-900 rounded-lg border-2 border-yellow-400 w-full max-w-md">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-purple-300 hover:text-white"
            aria-label="Close modal"
          >
            <Image src="/image/close.svg" alt="Close" width={24} height={24} />
          </button>

          <div className="flex justify-center mb-4">
            <div className="rounded-full p-2">
              <Image src={"/image/verify.png"} alt="" width={88} height={88} />
            </div>
          </div>

          <p className="text-white text-center mb-6">
            The withdraw of $GALA requires account verification to be completed
            first. Please complete it and try again.
          </p>

          <div className="flex flex-col gap-2">
            {verificationData.map(
              (item) =>
                item.id < 4 && (
                  <a key={item.id} target="_blank" href={item.link}>
                    <Primarybutton
                      mainImgSrc="/image/nws.png"
                      title={item.title}
                      iconImgSrc=""
                      content={item.content}
                      lastImgSrc={
                        getData?.completedTasks.includes(item.id)
                          ? "/image/arrowcheck.png"
                          : "/image/arrowright.png"
                      }
                      point={item.point}
                      coin={item.coin}
                    />
                  </a>
                )
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg mt-8"
          >
            ok
          </button>
        </div>
      </div>
    </div>
  );
}
