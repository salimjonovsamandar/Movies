import React from "react";
import { useEffect, useState } from "react";
import "../Series/index.css";

function Series() {
  const [data, setData] = useState([]);
  let [reck, setreck] = useState([]);

  useEffect(() => {
    const apiKey = "4G9HAF6-D66MQAB-NBHRH69-HDJCPSW";
    fetch("https://api.kinopoisk.dev/v1.4/series?lists=top250", {
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
      <div classNameName="">
        <h2>Series</h2>
        <div
          style={{ display: "flex", overflow: "hidden" }}
          classNameName="carousel carousel-center w-full p-2  to-transparent rounded-box"
        >
          {data.map((el) => {
            return (
              <div
                className="carousel-item flex flex-col lg:w-1/4 md:w-1/2 p-4 w-full"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                }}
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    width={300}
                    height={300}
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
        <div classNameName="content-main">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-14 mx-auto">
              <div
                className="flex flex-wrap -m-4"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  margin: "16px",
                  gap: "8px",
                }}
              >
                {reck.map((el) => {
                  return (
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                      <a className="block relative h-48 rounded overflow-hidden">
                        <img
                          width={300}
                          height={300}
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src={el.cover.url}
                        />
                      </a>
                      <div className="mt-4">
                        <h3
                          className="text-gray-100 text-xs tracking-widest title-font mb-1"
                          style={{ width: "250px" }}
                        >
                          CATEGORY
                        </h3>
                        <h2
                          className="text-gray-100 truncate title-font text-lg font-medium"
                          style={{ width: "250px" }}
                        >
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

export default Series;
