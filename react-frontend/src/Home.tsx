import React, { useState } from "react";
import { ProductWatch, ProductWatchTableColumns } from "./ProductWatchModel";
import axios from "axios";
import MaterialTable from "material-table";
import { isString } from "util";

const Home = () => {
  let defaultList: ProductWatch[] = [
    {
      id: "1234",
      productName: "test",
      url: "https://test.com",
      keyword: "keyword",
      email: "email@gmail.com",
      startWatchDate: new Date("Dec 20, 2019"),
      endWatchDate: new Date("Dec 20, 2020")
    },
    {
      id: "45332",
      productName: "test2",
      url: "https://test.com",
      keyword: "keyword",
      email: "email@gmail.com",
      startWatchDate: new Date("Dec 20, 2019"),
      endWatchDate: new Date("Dec 20, 2020")
    }
  ];

  const [productWatchList, setProductWatchList] = useState(defaultList);

  const getProductWatchList = () => {
    axios
      .get("./getAllData")
      .then(response => {
        console.log(response);
        setProductWatchList(defaultList);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProductWatchList();

  const translateDates = (productWatch: ProductWatch) => {
    const { startWatchDate, endWatchDate } = productWatch;
    return {
      ...productWatch,
      startWatchDate: isString(startWatchDate)
        ? startWatchDate
        : startWatchDate.toISOString(),
      endWatchDate: isString(endWatchDate)
        ? endWatchDate
        : endWatchDate.toISOString()
    };
  };

  return (
    <div className="container">
      <MaterialTable
        title="Inventory Check"
        // @ts-ignore
        columns={ProductWatchTableColumns}
        data={productWatchList}
        editable={{
          onRowAdd: newData => {
            return axios
              .post("./notify", translateDates(newData))
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
          },
          onRowUpdate: (newData, oldData) => {
            debugger;
            axios
              .post("./update", translateDates(newData))
              .then(response => {
                console.log(response);
                getProductWatchList();
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
            return Promise.resolve();
          },
          onRowDelete: (oldData: ProductWatch) => {
            axios
              .post("./delete", { id: oldData.id })
              .then(response => {
                console.log(response);
                getProductWatchList();
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
            return Promise.resolve();
          }
        }}
      />
    </div>
  );
};

export default Home;
