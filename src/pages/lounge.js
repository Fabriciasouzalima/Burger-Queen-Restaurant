import React, { useState, useEffect } from 'react';
import firebaseApp from '../utils/firebaseUtils';
import Input from '../components/Input';
import OptionsCard from '../components/OptionsCard';
import OrderCard from '../components/OrderCard';
import HamburguerOptions from '../components/HamburguerOptions';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  loungeStandard: {
    display: 'flex',
    justifyContent: 'space-around',
  }
});

const Lounge = () => {

  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [lunchMenu, setLunchMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');

  useEffect(() => {
    firebaseApp.collection('menu')
      .get()
      .then((snapshot) => {
        const breakfastFood = snapshot.docs.filter(docs => docs.data().breakfast).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setBreakfastMenu(breakfastFood);

        const lunchFood = snapshot.docs.filter(doc => doc.data().lunch).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setLunchMenu(lunchFood);
      })
  }, [])

  const submitOrder = () => {
    if (client && table) {
      firebaseApp.collection('order')
        .add({
          clientName: client,
          table: table,
          clientOrder: order,
          bill: total,
          status: 'Pendente',
        })
        .then(() => {
          setClient(['']);
          setTable(['']);
          setOrder([]);
        })
    }
    console.log('Enviou!')
  }

  const selectOptions = (item) => {
    if (item.options.length !== 0) {
      console.log(item.options)
      // HamburguerOptions(item.options);
      setOrder([...order, item.options])
    } else if (!order.includes(item)) {
      item.count = 1;
      setOrder([...order, item])
    } else {
      item.count += 1;
      setOrder([...order])
    }
  }

  // if (!order.includes(item)) {
  //   item.count = 1;
  //   setOrder([...order, item])
  // } else {
  //   item.count += 1;
  //   setOrder([...order])
  // }
  // console.log(item);
  // console.log(item.options);
  // console.log(item.extra[0].price);

  const reduceItem = (item) => {
    if (order.includes(item)) {
      item.count -= 1;
    }
    const minus = order.filter(element => element.count > 0)
    setOrder([...minus])
  }

  const removeOrder = (item) => {
    const deleteItem = (order.indexOf(item));
    order.splice(deleteItem, 1);
    setOrder([...order]);
  }

  const total = order.reduce((acc, item) => acc + (item.count * item.price), 0)

  return (
    <div>
      <div>
        <Input type='text' value={client} placeholder='Nome cliente' handleChange={event => setClient(event.currentTarget.value)} />
        <Input type='number' value={table} placeholder='Nº de Mesa' handleChange={event => setTable(event.currentTarget.value)} />
      </div>
      <div className={css(styles.loungeStandard)}>
        <OptionsCard
          breakfastMenu={breakfastMenu}
          lunchMenu={lunchMenu}
          selectOptions={selectOptions}
        />
        <OrderCard
          order={order}
          removeOrder={removeOrder}
          reduceItem={reduceItem}
          total={total}
          submitOrder={submitOrder}
        />
      </div>
    </div>
  );
}

export default Lounge;
