"use client";
import { userIDAtom } from "@/store/userInfo";
// import { socialTaskData } from "@/data/socialtask"
import Primarybutton from "../button/primaryButton";
// import { TaskData } from "@/app/quest/page";
import { useAtom } from "jotai";
import axios from "axios";
import { AccountData } from "../accountverity/accountVerification";

const SocialTask:React.FC<AccountData> = ({
  tasks,
  completedTasks,
  render,
  setRender
}) => {
  const [userID] = useAtom(userIDAtom);

  const handletask = (id: number) => {
    axios
      .put(
        `https://b702-52-68-113-84.ngrok-free.app/api/update/task/${userID}`,
        { taskId: id }
      )
      .then((res) => {
        console.log("PUT update", res);
        response()

      })
      .catch((err) => console.log(err));
  };

  const response = () => {
    setTimeout(() => {
      setRender(!render)
    }, 3000);
  }

  return (
    <div>
      <div className="text-base font-semibold text-white  ">
        Social Task
      </div>
      <div className="flex flex-col gap-2 p-2">
        {tasks.map(
          (list) =>
            list.id >= 4 && (
              <a
                target="_blank" 
                key={list.id}
                href={list.link}
                onClick={() => handletask(list.id)}
              >
                <Primarybutton
                  mainImgSrc={list.image}
                  title={list.title}
                  iconImgSrc="/image/goldcoin.png"
                  content={list.content}
                  lastImgSrc={
                    completedTasks.includes(list.id)
                      ? "/image/arrowcheck.png"
                      : "/image/arrowright.png"
                  }
                />
              </a>
            )
        )}
      </div>
    </div>
  );
};

export default SocialTask;
