import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import axios from "axios";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold"
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#888',
  },
  rowPadding:{
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center'
  },
  headerColor: {
    backgroundColor: '#A0A0A0',
    textAlign: 'center',
    padding: 5,
    fontSize: 10
  },
  rowFont: {
    fontSize: 10,
    
  },
  addresspad: {
    padding: 0
  },
  otherPad:{
    padding: 10
  }
});

const OrderInvoice = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.section}>
          <Text style={styles.companyInfo}>
            <Text >BazarBD</Text>{"\n"}
            <Text style={[styles.rowFont, styles.addresspad]}>Address: 254/6, East Shantibag, Dhaka-1217</Text>{"\n"}
            <Text style={[styles.rowFont, styles.otherPad, {padding: 9}]}>Mobile: 012987064729 </Text>{"\n"}
            <Text style={[styles.rowFont,styles.otherPad]}>Website: https://bazar-bd.vercel.app/ </Text>
            
          </Text>
        </View>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice for Order #{order.id}</Text>
        <Text style={styles.text}>Date: {new Date(order.created_at).toLocaleDateString()}</Text>
        <Text style={styles.text}>Shipped To: {order.name || "Not specified"}</Text>
        <Text style={styles.text}>Total: ${(parseFloat(order.total_price) + parseFloat(order.delivery_charge)).toFixed(2)}</Text>
      </View>

      {/* Table for Items */}
      <View style={styles.section}>
      <Table>
        <TH >
            <TD style={styles.headerColor}>Product</TD>
            <TD style={styles.headerColor}>Color</TD>
            <TD style={styles.headerColor}>Size</TD>
            <TD style={styles.headerColor}>Price</TD>
        </TH>
        {
            order?.cart?.map((item) =>(
        <TR>
            <TD style={[ styles.rowPadding, styles.rowFont, styles.otherPad]}>{item.productname} (x{1})</TD>
            <TD style={[ styles.rowPadding, styles.rowFont, styles.otherPad]}>{item.color || "N/A"}</TD>
            <TD style={[ styles.rowPadding, styles.rowFont, styles.otherPad]}>{item.size || "N/A"}</TD>
            <TD style={[ styles.rowPadding, styles.rowFont, styles.otherPad]}>${parseFloat(item.price).toFixed(2)}</TD>
        </TR>             
            ))
          }
    </Table>
      </View>

      {/* Other Content */}
    </Page>
  </Document>
);




const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const email = user?.email;
  const name = user?.displayName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get(`https://postgre-server.vercel.app/order/${email}`);
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [email]);



  
  return (
    <div className="mt-24 w-full px-3 lg:px-0">
      <h2 className="text-4xl font-semibold text-slate-500">Your Orders</h2>

      {Array?.isArray(orders) && orders?.map((order, index) => (
        <div key={order.id} className="mb-8 ">
          {/* Order Details */}
          <div className="grid grid-cols-2 border border-gray-200 mt-3 lg:grid-cols-5 lg:place-items-center gap-10 bg-gray-100 py-4 px-4 rounded-t-lg items-center">
            <div className="w-full">
              <h3 className="text-xl">Order Number</h3>
              <p className="text-base">#{order.id}</p>
            </div>
            <div className="w-full">
              <h3 className="text-xl">Date</h3>
              <p className="text-xl">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div className="w-full">
              <h3 className="text-xl">Total</h3>
              <p className="text-xl">${(parseFloat(order.total_price) + parseFloat(order.delivery_charge)).toFixed(2)}</p>
            </div>
            <div className="w-full">
              <h3 className="text-xl">Shipped To</h3>
              <p className="text-xl">{name || "Not specified"}</p>
            </div>
            <div className="w-full">
              <PDFDownloadLink document={<OrderInvoice order={order} />} fileName={`Invoice_Order_${order.id}.pdf`}>
                {({ loading }: { loading: any; }) => (
                  <button className="bg-[#C62931] w-full px-5 lg:px-16 rounded-md text-base lg:text-xl text-white duration-300 hover:bg-[#FFFFFF] hover:text-gray-600 py-2">
                    {loading ? 'Generating Invoice...' : 'Download Invoice'}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </div>

          {/* Order Status */}
          <div className="grid grid-rows-5 lg:grid-cols-5 gap-8 mx-2 items-start">
            <div className="col-span-4">
              <div className="bg-[#dff0d8] my-5 py-3 rounded-lg px-8">
                <h4 className="text-lg text-[#00A362] font-semibold">Shipped</h4>
                <p className="text-lg text-[#00A362] font-medium">Est. delivery between Aug 5 – Aug 9th, 2017</p>
              </div>

              {/* Display each item in the cart */}
              {order.cart && Array.isArray(order.cart)  && order.cart.map((item) => (
                <div key={item.id} className="flex flex-col lg:flex-row gap-3 justify-between mb-4">
                  <div className="flex items-center gap-10">
                    <img src={item.product_image[0] || "https://via.placeholder.com/150"} alt={item.productname} className="w-20 h-20 rounded-xl" />
                    <div>
                      <h6 className="text-charcoal mb-2">
                        <a href="" className="text-charcoal">{1} x {item.productname}</a>
                      </h6>
                      <ul className="list-unstyled text-pebble mb-2 small">
                        <li><b>Color:</b> {item.color || "N/A"}</li>
                        <li><b>Size:</b> {item.size || "N/A"}</li>
                      </ul>
                      <h6 className="text-charcoal text-left"><b>${item.price}</b></h6>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-[#ffffff] border border-gray-200 py-2 w-full px-14 hover:bg-gray-100 text-gray-600 rounded-md text-xl">Buy It Again</button>
                    <button className="bg-[#ffffff] border border-gray-200 py-2 w-full px-14 hover:bg-gray-100 text-gray-600 rounded-md text-xl">Request a Return</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Track Shipment Button */}
            <div className="w-full col-span-1 my-5">
              <button className="bg-[#FFFFFF] w-full px-6 lg:px-20 rounded-md text-xl hover:text-white text-gray-800 border border-gray-300 duration-300 hover:bg-red-600 py-2">Track Shipment</button>
            </div>
          </div>
        </div>
      ))}


    </div>
  );
};

export default Order;
