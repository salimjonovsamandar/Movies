import React, { useEffect, useState } from "react";
import "../Home/index.css";

export default function Home() {
  const [data, setData] = useState([]);
  let [reck, setreck] = useState([]);

  useEffect(() => {
    const apiKey = "BWPQ0A7-CQ1MV8V-MAFCWFS-3ZTRVTK";
    fetch("https://api.kinopoisk.dev/v1.4/movie?lists=top250", {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.docs))
      .catch((error) => console.error("Error:", error));

    fetch("https://api.kinopoisk.dev/v1.4/list?page=4&limit=20", {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => setreck(data.docs))
      .catch((error) => console.error("Error:", error));
  }, []);
  console.log(reck);
  return (
    <>
      <div className="">
        <h2>Trending</h2>
        <div className="carousel carousel-center w-full p-2  to-transparent rounded-box">
          {data.map((el) => {
            return (
              <div className="carousel-item flex flex-col lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={el.poster.previewUrl}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-100 text-xs tracking-widest title-font mb-1">
                    {el.alternativeName}
                  </h3>
                  <h2 className="text-gray-100 title-font text-lg font-medium">
                    {el.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="content-main">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-14 mx-auto">
              <div className="flex flex-wrap -m-4">
                {reck.map((el) => {
                  return (
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                      <a className="block relative h-48 rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src={el.cover.url}
                        />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-gray-100 text-xs tracking-widest title-font mb-1">
                          CATEGORY
                        </h3>
                        <h2 className="text-gray-100 truncate title-font text-lg font-medium">
                          {el.name}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
