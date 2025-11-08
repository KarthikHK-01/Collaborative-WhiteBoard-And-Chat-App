import { useEffect, useState } from "react";
import socket from "../config/socket";

export default function People () {
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        socket.on("joined-room", ({roomId, people}) => {
            if(people) {
                setPeoples(people);
            }
        });

        return () => {
            socket.off("joined-room");
        }
    }, []);

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-[250px] overflow-hidden">
            <div className="bg-green-600 text-white p-4 font-semibold flex-shrink-0 rounded-t-lg">People ({peoples.length})</div>

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {peoples.map((person) => (
                <div 
                key={person.socketId}
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded mb-1">
                    <span className="text-sm font-medium">{person.name}</span>
                </div>
              ))}
            </div>
        </div>
    )
}