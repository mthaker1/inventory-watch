import React from "react";
import { ProductWatch, ProductWatchTableColumns } from "./ProductWatchModel";
import axios from "axios";
import MaterialTable from "material-table";
var moment = require('moment');

const Home = () => {
  let productWatchList:ProductWatch[] = [];

  const getProductWatchList = () => {
    axios
      .get("./getInventoryData")
      .then(response => {
        // @ts-ignore We know response is always type ProductWatch[]
        productWatchList = response.data.map(productWatch => translateDates(productWatch));
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
      startWatchDate: moment(startWatchDate).format('YYYY-MM-DD'),
      endWatchDate: moment(endWatchDate).format('YYYY-MM-DD'),
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
              .post("./addProductWatch", translateDates(newData))
              .then(response => {
                getProductWatchList();
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
          },
          onRowUpdate: (newData, oldData) => {
            debugger;
            axios
              .post("./updateProductWatch", translateDates(newData))
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
              .post("./deleteProductWatch", { id: oldData.id })
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
