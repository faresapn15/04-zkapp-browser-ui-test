
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import '../styles/globals.css'
import { useEffect, useState, useRef} from "react";
import './reactCOIServiceWorker';
import ZkappWorkerClient from './zkappWorkerClient';

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'snarkyjs'

let transactionFee = 0.1;

export default function App() {

  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

// --------------------------------------------------------
// Status

  const status1 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "block";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status2 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "block";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status3 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "block";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status4 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "block";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status5 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "block";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status6 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "block";
  }
  
   const send1 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "block";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send2 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "block";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send3 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "block";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send4 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "block";
  }
  
  const donesend = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendLoading")!
	el5.style.display = "none";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "block";
	const el7 = document.getElementById("sendCheck")!
	el7.style.display = "block";
	const el8 = document.getElementById("closeSend")!
	el8.style.display = "block";
  }
	
  // -------------------------------------------------------
  // Do Setup
  const connectWallet = async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        
        console.log('Loading SnarkyJS...');
		status1();
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;
		status2();

        if (mina == null) {
          setState({ ...state, hasWallet: false });
		  return;
        }

        const publicKeyBase58 : string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log('using key', publicKey.toBase58());

        console.log('checking if account exists...');
        const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        console.log('compiling zkApp');
		status3();
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');

        const zkappPublicKey = PublicKey.fromBase58('B62qrDe16LotjQhPRMwG12xZ8Yf5ES8ehNzZ25toJV28tE9FmeGq23A');

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log('getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum();
        console.log('current state:', currentNum.toString());

        setState({ 
            ...state, 
            zkappWorkerClient, 
            hasWallet: true,
            hasBeenSetup: true, 
            publicKey, 
            zkappPublicKey, 
            accountExists, 
            currentNum
        });
      }
  };

  // -------------------------------------------------------
  // Newwwwww
  const connectBtnclick = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "block";
	const el2 = document.getElementById("connectBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("loading")!
	el3.style.display = "block";
	const el4 = document.getElementById("banner")!
	el4.style.display = "none";
	const el5 = document.getElementById("banner2")!
	el5.style.display = "none";
  };
  
  const hideloadingBtn = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
	const el2 = document.getElementById("loading")!
	el2.style.display = "none";
	const el3 = document.getElementById("succes")!
	el3.style.display = "block";
  };
  
  const closeGetclick = () => {
    const el = document.getElementById("getscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("getBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "block";
  };
  
  const closeSendclick = () => {
    const el = document.getElementById("sendscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("sendBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "block";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "none";
    const el7 = document.getElementById("sendCheck")!
	el7.style.display = "none";
    const el8 = document.getElementById("closeSend")!
	el8.style.display = "none";
  };
  
  const getscreenShow = () => {
	const el = document.getElementById("getscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("getBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "none";
  };
  
  const sendscreenShow = () => {
	const el = document.getElementById("sendscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("sendBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "none";
    const el6 = document.getElementById("sendLoading")!
	el6.style.display = "block";
  };
  
  const noAccount = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("ftxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoAccount")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const backNoAccountClick = () => {
    location.reload();
  }
  
  const backNoWalletClick = () => {
    location.reload();;
  }
  
  const noWallet = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("walletTxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoWallet")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const getload = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "block";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "none";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "none";
  }
  
  const getdone = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "none";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "block";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "block";
  }
  // -------------------------------------------------------
 
   // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
	send1();
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
	send2();
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
	send3();
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()

    console.log('requesting send transaction...');
	send4();
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

	donesend();

    setState({ ...state, creatingTransaction: false });
  }
  
   // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
	getload();
    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.zkappPublicKey! })
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());
	getdone();

    setState({ ...state, currentNum });
  }
 
  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    hasWallet = <a id="walletLink" style={{display: 'block'}} href={auroLink} target="_blank" rel="noreferrer">
		<h1 className={styles.walletLink}>[[CLICK HERE]]</h1>
	</a>
	status4();
	noWallet();

  }

  let setupText = state.hasBeenSetup ? 'SnarkyJS Ready' : 'Loading...';
  let setup = <div id="setup" style={{display: 'block'}}> { setupText } { hasWallet }</div>
  
  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
	  const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
	accountDoesNotExist = <a id="flink" style={{display: 'block'}} href={faucetLink} target="_blank" rel="noreferrer">
		<h1 className={styles.faucetHere}>[[CLICK HERE]]</h1>
	</a>
	status5();
	noAccount();
	hasBeenSetup: false;
  }
  
  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {	
    mainContent =
		<div>
			<a id="sendBtn" style={{display: 'block'}} onClick={() => {onSendTransaction(); sendscreenShow(); }}>
					<span className={styles.sendBtn}> </span>
			</a>
			
			<a id="getBtn" style={{display: 'block'}} onClick={() => {onRefreshCurrentNum(); getscreenShow(); }}>
					<span className={styles.getBtn}></span>
			</a>
			
			<span id="getBtnDisable" style={{display: 'none'}} className={styles.getBtnDisable}></span>
			<span id="sendBtnDisable" style={{display: 'none'}} className={styles.sendBtnDisable}></span>
			
			<h1 className={styles.txtAddrs}>{  state.publicKey!.toBase58() } </h1>
			<h1 className={styles.addrs}>Address :</h1>
			
			<div id="getscreen" style={{display: 'none'}} className={styles.getscreen}>
				<span className={styles.getscreenBlack}> </span>
				<span className={styles.getscreenImg}> </span>
				
				<a id="closeGet" style={{display: 'block'}} onClick={() => {closeGetclick(); }}>
					<span className={styles.closeGet}> </span>
				</a>
				
				<span id="getLoading" style={{display: 'none'}} className={styles.getLoading}> </span>
				
				<h1 id="gettext" style={{display: 'none'}} className={styles.txtState}>Current Number in ZkApp :</h1>
				<h1 id="getnumber" style={{display: 'none'}} className={styles.numState}>{ state.currentNum!.toString() } </h1>
			</div>
			
			<div id="sendscreen" style={{display: 'none'}} className={styles.sendscreen}>
				<span className={styles.sendscreenBlack}> </span>
				<span className={styles.sendscreenImg}> </span>
				
				<a id="closeSend" style={{display: 'none'}} onClick={() => {closeSendclick(); }}>
					<span className={styles.closeSend}> </span>
				</a>
				
				<span id="sendLoading" style={{display: 'none'}} className={styles.sendLoading}> </span>
				<span id="sendCheck" style={{display: 'none'}} className={styles.sendCheck}> </span>
				<span id="sendDone" style={{display: 'none'}} className={styles.sendDone}> </span>
				
				<h1 id="send1" style={{display: 'none'}} className={styles.statusSendTxt}>Sending a Transaction...</h1>
				<h1 id="send2" style={{display: 'none'}} className={styles.statusSendTxt}>Creating Proof...</h1>
				<h1 id="send3" style={{display: 'none'}} className={styles.statusSendTxt}>Getting Transaction JSON...</h1>
				<h1 id="send4" style={{display: 'none'}} className={styles.statusSendTxt}>Requesting Send Transaction...</h1>


			</div>

		</div>
	hideloadingBtn();
	status6();
  }
	
  return (
	<div className={styles.container}>	
	  <Head>
        <title>zkApp [AlodiaGeo]</title>
        <meta name="description" content="ZkApp By mbukhori" />
		<meta name="viewport" content="width=1024"/>
        <link href="data:image/x-icon;base64,AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAKBEAAJ4EAAAwMAAAAQAgAGgmAADGFQAAKAAAABAAAAAgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//Q1H//0pY//9KWP//RVT//0ZV//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0xa//+6v///uL3//5qi//+utP//SFb//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9FVP//fIb//3R+//+Aif//iJH//0dV//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//1hm//9uef//goz//4eR//9xfP//bXj//4CK//+Ejv//bHj//1lm//9CUf//QlH//0JR//9CUf//QlH//0NS//+Biv//p67//7G3//++w///pq3//6at///EyP//ub///56m//+Bi///Q1L//0JR//9CUf//RFP//1Jf//9KWP//U2D//1Nh//9RX///V2X//1Be//9NW///UV///1Zj//9WZP//SFf//0ZV//9KWP//QlH//0ZV//9rd///Y3D//2Bt//9aZ///W2j//2p1//9PXv//Tl3//2Zz//9rd///Wmf//1xo//9hbf//VWP//0JR//9GVf//bHj//2Vx//9ib///YW7//1xo//9rdv//T17//1ln//9baP//a3f//1ll//9lcf//Z3T//0pY//9CUf//RVT//2x4//9oc///Ul///2t3//9UYf//a3b//1Jg//9pdf//VmT//2t2//9MWv//X2v//15r//9DUv//QlH//0JR//9XZP//SVf//0VT//9YZv//RVT//1to//9GVf//W2j//0VU//9YZv//RFL//1Ri//9MWv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9FU///VGH//09d//9PXf//VGL//0hX//9JV///UF7//0ZV//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//1Vi//+/xP//oKf//52k///Fyv//fIf//3uF//+rsf//b3v//0dV//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//VmP//8nN//+/xP//oKf//9/h///EyP//rrP//9TW///Jzf//VWP//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9OXP//nqX//7O5//9zff//wcb//7vA//+hqP//wsb//7m///9TYP//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0NS//9OXP//UmD//0hW//9UYf//U2H//09d//9UYf//U2D//0RT//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0NS//9MWv//S1n//05c//9UYv//UF7//1Ff//9VY///TFr//1Bd//9KWP//T13//05c//9TYf//UV///1Nh//9MWv//TVv//0xa//9DUv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//TFr//4eR//+Fjv//maH//8PI//+hqP//r7b//8fL//+Hkf//o6r//3yG//+fpv//n6b//7/E//+xt///usD//4iR//+Rmv//iZP//0xa//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9RX///mKD//5ef//+nr///0NT//5We///Dyf//zdD//4iR//+6wP//jpf//7S6///Z2///3N///8DF///Izf//hY///6Co//+bo///UV///0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//RVT//2Zy//+0uf//ur///6at//++wv//oaj//7O4//+3vP//lZ3//8LH//+0uf//o6r//6Oq//+4vf//qK///7W7//+aov//ur///7S5//9lcv//RVT//0JR//9CUf//QlH//0JR//9CUf//QlH//0NS//9HVv//RFL//0JR//9FVP//TFr//1Rh//9VYv//VGL//1Zj//9RXv//VWP//1Vj//9PXf//V2T//1Vi//9PXf//T13//1Vj//9VYv//U2H//1Jg//9XZP//VGH//0dW//9CUf//Q1L//0VU//9CUf//QlH//0JR//9CUf//SFf//2t2//9RXv//R1b//1ln//9jcP//SFb//0ZV//9cav//V2X//0hX//9cav//V2X//0dW//9SYP//TVv//0NS//9HVv//W2j//2Zy//9LWf//VmT//1pn//9FVP//QlH//0NS//9QXv//W2j//0ZU//9CUf//QlH//0JR//9KWf//eIP//1xq//9VYv//cHv//2x3//9RX///SVf//2l1//9odP//TVr//2l1//9odP//Slj//1Vk//9UY///R1b//1ln//96hf//fIb//1hl//9dav//Wmf//0tZ//9IVv//S1n//2Ft//9mc///R1X//0JR//9CUf//QlH//0pZ//95hP//X23//2Jv//9nc///ZXL//2Bt//9MWv//a3b//2t2//9NW///a3b//2t2//9KWP//VWT//1Zk//9JWP//X23//2h0//9xfP//aHT//05d//9jb///cXz//2x3//9rd///bXn//2Fu//9GVf//QlH//0JR//9CUf//Sln//3mE//9hbv//aXX//2Vx//9ea///bnv//1Be//9rd///a3b//01b//9rdv//a3b//0pY//9VZP//WGb//1Ng//9hbf//XGn//215//9rdv//TVr//2l0//9wfP//bHf//255//9tef//WGX//0RT//9CUf//QlH//0JR//9KWf//eYT//19s//9gbf//ZnL//1Be//9tef//Xmv//215//9rdv//TVv//2t2//9rdv//Slj//1Vk//9aaP//YW7//2Fu//9OXP//a3f//2t2//9MWv//Ym7//2p2//9PXf//XWr//2Zz//9JWP//QlH//0JR//9CUf//QlH//0pZ//93gv//YnD//215//9baP//SFf//1xp//9kcP//b3v//2hz//9MWv//a3b//2t2//9KWf//V2X//1xp//9nc///ZnP//01b//9rdv//a3b//0pY//9YZf//Z3P//09d//9fbP//Wmb//0VU//9CUf//QlH//0JR//9CUf//R1b//2l1//9uev//g4z//1Rh//9HVf//XWn//2p1//9xfP//U2H//0pY//9teP//a3b//0tZ//9daf//anb//3iC//9baP//Sln//2t2//9sd///SFb//0hW//9fa///ZnP//2p1//9WZP//RFP//0JR//9CUf//QlH//0JR//9EUv//VWL//3iC//9aZv//RVT//0JR//9MWv//cXz//2Jv//9HVf//SVj//3N///9oc///R1b//01b//94gv//ZHH//0hX//9HVv//Z3P//2x4//9IVv//QlH//01b//94gv//Ym7//0hW//9CUf//QlH//0JR//9CUf//QlH//0JR//9EU///Slj//0RT//9CUf//QlH//0NS//9JV///RlX//0JR//9DUv//SVj//0dW//9CUf//Q1L//0pY//9GVf//QlH//0JR//9HVv//SFb//0NS//9CUf//Q1L//0pY//9GVf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAADAAAABgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0pY//9ea///Xmr//1dj//9WY///Xmr//2Bs//9PXf//Slj//09d//9aZ///U2H//0dV//9DUv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//19r//+ttP//rrT//5GY//+Pl///rbP//7W6//95hP//ZXL//3iC//+fp///hpD//1lm//9HVv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//2Vx///Hy///z9P//7C1//+jqv//xsv//93f//+ss///lJz//56l///Fyf//vsP//5Oc//9WZP//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//2Ju//+7v///0dT//7u///+YoP//u8D//+Tm///S1f//ub7//7O4///R1P//4eP//8TJ//9kcP//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//1pn//+epf//wsb//7e8//96g///oKb//9ja///N0P//tLn//6yy///Kzv//2Nr//7q///9ibv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//01b//9teP//g4z//3+J//9ZZv//bnn//4+X//+Kk///fYf//3iD//+Ikf//jpb//3+I//9SX///QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0NS//9GVP//R1b//0dW//9EU///RlT//0hX//9IV///R1b//0dV//9IVv//SFf//0dW//9DUv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//RFP//0ZU//9FVP//RVT//0dV//9IV///SFb//0dV//9HVf//SFf//0hX//9GVP//RlX//0dV//9FU///RVT//0ZV//9GVf//R1b//0hW//9HVv//SFb//0hW//9GVP//RVT//0ZU//9GVP//RFP//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9EU///WWb//2x4//9oc///a3b//3iD//+Llf//hY///3mE//99h///i5X//4yW//9teP//cXz//3iD//9kb///a3b//3iC//9wfP//fYf//4mT//+Bi///hY///4WP//9uev//a3b//3B7//9uev//WWb//0RT//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9GVP//bnr//5Oc//+LlP//kJn//6iw///P0///vsP//6Sr//+zuv//z9P//83R//+QmP//m6P//6yz//+CjP//kJn//620//+qsP//vsP//87R//+7wf//w8n//8HG//+Rmv//jZb//5uj//+YoP//bnr//0ZU//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9HVv//c33//5mi//+Rmv//lp7//621///T1///s7n//5Oc//+7wf//1dj//8fL//+Ikf//naX//7e9//+Kk///lZ7//7zC///V2P//4OL//9rd///Cxv//yc7//8PI//+Hkf//iJL//6Co//+epv//c33//0dW//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0VU//9UYv//iZL//7e8//+0uf//rLL//7K4///R1f//uL3//56l//++w///0NT//8PH//+TnP//rLL//8vP//+ts///qbD//7e8///Gyv//09b//9LV//+8wf//xMj//8PI//+Xn///oKj//7vA//+5vv//iJL//1Ri//9FVP//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0dW//9baP//i5T//7W6//+3vP//pq3//5+m//+yuP//qK7//5qh//+lrP//rrT//6iv//+Ol///o6n//7zC//+yt///o6r//5ee//+Tm///oqn//6yy//+epf//paz//6mw//+Vnf//oqn//7e8//+1uv//ipT//1po//9HVv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9EU///Q1L//0JR//9CUf//QlH//0RT//9KWf//VmP//2Ft//9hbf//XWr//1tp//9gbf//XWr//1lm//9dav//X2z//11q//9WZP//XGn//2Rv//9hbf//XGj//1dl//9WZP//W2j//15r//9caP//XWn//11q//9ZZv//XWn//2Ju//9hbf//VmL//0hX//9DUv//QlH//0NS//9DUv//Q1L//0JR//9CUf//QlH//0JR//9CUf//QlH//0hW//9YZf//U2D//0dV//9DUv//R1b//09e//9WY///TVv//0NS//9DUv//Sln//1Ff//9OXP//R1b//0ZU//9PXv//UF7//0ta//9EU///R1b//0xa//9IV///RFP//0JR//9CUf//R1b//09e//9WY///TVv//0VU//9LWv//UF7//09d//9FVP//QlH//0JR//9CUf//RFP//0pY//9QXv//Slj//0NS//9CUf//QlH//0JR//9CUf//QlH//05c//9uev//ZnL//09c//9IVv//UmD//2Fu//9qdf//WWb//0ZU//9DUv//U2L//2Jv//9da///T17//0pZ//9ea///YW7//1dl//9IV///TFv//1Vj//9RX///SFf//0NS//9HVv//VGL//2Rx//9uef//XGn//0pZ//9WZP//Xmv//1ln//9IV///QlH//0JR//9DUv//Slj//1Zj//9gbf//U2H//0NS//9CUf//QlH//0JR//9CUf//QlH//1Be//92gP//bnr//1Zk//9QXv//YG3//3J9//9vev//Xmv//0ta//9GVP//WGX//2t3//9qdv//V2T//01a//9kcf//bHj//2Nv//9LWf//TFv//1dl//9WZP//TFr//0ZV//9SYP//aXX//32I//9/if//Z3P//1Ng//9daf//X2v//1hl//9JWP//RFP//0RT//9FVP//UmD//2Ju//9pdf//V2T//0RT//9CUf//QlH//0JR//9CUf//QlH//1Be//94g///cHz//1tp//9aZ///ZXH//296//9rd///Ym7//1Vj//9IV///WWX//296//9vev//WWX//01b//9ncv//cXz//2dy//9MWv//TFv//1hm//9YZv//TFv//0lY//9ZZ///a3f//3eC//96hf//bXn//15r//9WZP//WWb//19r//9fbP//XGn//1lm//9aZv//Ym7//2p2//9pdf//VmP//0RT//9CUf//QlH//0JR//9CUf//QlH//1Be//94g///cHz//11r//9jcP//ZnL//2Vy//9jcP//ZXL//2Bt//9MWv//WWX//296//9vev//WWX//01b//9ncv//cXz//2dy//9MWv//TFv//1hm//9YZv//Tl3//0ta//9ea///ZHH//2Zy//9uev//cXz//2Zx//9OXP//VWP//2l1//90f///c37//296//9vev//cHv//215//9kcf//UmD//0NS//9CUf//QlH//0JR//9CUf//QlH//1Be//94g///cHz//19s//9pdP//aXX//2Rw//9fbP//aXX//2t4//9QXv//WWb//296//9vev//WWX//01b//9ncv//cXz//2dy//9MWv//TFv//1hm//9YZv//UmD//1Jg//9gbP//YGz//19s//9seP//cXz//2dy//9NW///WGT//255//9yff//cXz//296//9we///cHz//2x4//9ea///Tlz//0NS//9CUf//QlH//0JR//9CUf//QlH//1Be//94g///cHz//11r//9ib///aHT//2Vx//9WY///ZXH//3B8//9YZv//Xmz//297//9vev//WWX//01b//9ncv//cXz//2dy//9MWv//TFv//1hm//9ZZ///WWf//1tp//9ibv//WWb//1Vj//9pdf//cXz//2dy//9NW///VmP//2t2//9uev//ZXH//11p//9jb///a3f//2l1//9UYv//R1b//0JR//9CUf//QlH//0JR//9CUf//QlH//1Be//94g///cHz//1xq//9ebP//ZXL//2Nv//9NW///XGn//215//9hbf//ZXH//3B7//9vev//WWX//01b//9ncv//cXz//2dy//9MWv//TFv//1hm//9ZZ///Xmv//2Rx//9lcf//VWP//01b//9ncv//cXz//2dy//9NW///UmD//2Rw//9seP//Wmf//0pZ//9YZf//ZHD//2Nv//9LWf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//1Be//93gv//cHz//19t//9pdf//ZnL//1lm//9JWP//UV///2Bs//9ib///aXX//3B7//9uef//WGX//01b//9ncv//cXz//2dy//9MWv//TVz//1hm//9aaP//X2z//2dz//9qd///V2X//01b//9ncv//cXz//2dy//9MWv//Tlz//15q//9qdf//Wmf//0xa//9baf//YGz//1ll//9IVv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//05c//9vev//bnr//2h1//99iP//bnn//1Jf//9HVf//UF7//19s//9kcf//bnn//3F8//9jb///UF7//0xa//9ncv//cXz//2dy//9MWv//UF7//11q//9fbP//anb//3J9//9oc///U2H//01b//9ncv//cXz//2dy//9MWv//R1b//1Ng//9kcP//X2z//1lm//9lcf//Ym7//1Vi//9GVf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0pY//9jbv//bHj//3R///+Ejv//bXf//0xa//9FU///UF7//2Bs//9pdf//cn3//255//9UYv//R1X//01b//9qdv//c37//2dy//9MWv//UF7//2Bs//9rd///d4H//3aA//9eav//TFr//0xa//9nc///cn3//2l0//9MWv//QlH//0hX//9ZZf//ZnL//215//9teP//YW3//1Jf//9FVP//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0ZU//9SYP//bnn//32H//9mcf//UV7//0VT//9CUf//RVT//1Rh//9yff//c37//2Fu//9LWv//Q1H//09d//9yfv//d4P//2Zx//9LWf//RVT//1Zj//95g///eYP//2Rx//9OXP//RFP//0tZ//9mcv//c37//2x3//9NW///QlH//0NS//9KWf//aHT//32H//9rd///VmP//0dW//9DUv//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0NR//9IVv//WWb//2Ju//9PXP//RFP//0JR//9CUf//QlH//0lY//9dav//XGn//1Be//9FVP//QlH//0lY//9dav//X2z//1Vi//9HVf//QlH//0pY//9hbv//X2v//1Be//9FVP//QlH//0dV//9VYv//XGn//1lm//9IVv//QlH//0JR//9EU///VmP//2Rw//9XZP//Slj//0NS//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//RFP//0VT//9DUv//QlH//0JR//9CUf//QlH//0NS//9EU///RFP//0NS//9CUf//QlH//0NS//9EU///RFP//0RS//9CUf//QlH//0NS//9FU///RFP//0NS//9CUf//QlH//0JR//9EUv//RFP//0RT//9CUf//QlH//0JR//9CUf//RFP//0VU//9EU///Q1L//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR//9CUf//QlH//0JR/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" rel="icon" type="image/x-icon" />
	  </Head>
	  
		<main className={styles.main}>
		
			<div id="homepage" className={styles.homepage}>
				<span className={styles.homepageImg}> </span>
				<a id="connectBtn" style={{display: 'block'}} onClick={() => {connectBtnclick(); connectWallet();}}>
					<span className={styles.connectBtn}> </span>
				</a>
				
					<span id="loadingBtn" style={{display: 'none'}} className={styles.loadingBtn}> </span>
					<span id="loading" style={{display: 'none'}} className={styles.loading}> </span>
					
					<h1 id="status1" style={{display: 'none'}} className={styles.statusTxt}>Status : Sync & Checking Wallet ...</h1>
					<h1 id="status2" style={{display: 'none'}} className={styles.statusTxt}>Status : Sync DONE! Connect to Wallet...</h1>
					<h1 id="status3" style={{display: 'none'}} className={styles.statusTxt}>Status : Checking & Validation Address...</h1>
					<h1 id="status4" style={{display: 'none'}} className={styles.statusTxt}>Status : Wallet Extension Not Found!</h1>
					<h1 id="status5" style={{display: 'none'}} className={styles.statusTxt}>Status : Address Not Valid or No Balance!</h1>
					<h1 id="status6" style={{display: 'none'}} className={styles.statusTxt}>Status : READY FOR TRANSACTION!!!</h1>
					
					<span id="caution" style={{display: 'none'}} className={styles.caution}> </span>
					
					<span id="succes" style={{display: 'none'}} className={styles.succes}> </span>

					<h1 id="ftxt" style={{display: 'none'}} className={styles.faucetTxt}>Invalid Account or No Balance!! Please check and fund on this link </h1>
					
					<h1 id="walletTxt" style={{display: 'none'}} className={styles.walletTxt}>Could not find a wallet. Please Install Auro wallet and Re-Connect!! </h1>
					
					<a id="backNoAccount" style={{display: 'none'}} onClick={() => {backNoAccountClick(); }}>
						<span className={styles.backNoAccount}> </span>
					</a>
					
					<a id="backNoWallet" style={{display: 'none'}} onClick={() => {backNoWalletClick(); }}>
						<span className={styles.backNoWallet}> </span>
					</a>
					
					<span id="banner" style={{display: 'block'}} className={styles.banner}> </span>
					<span id="banner2" style={{display: 'block'}} className={styles.banner2}> </span>
					
				{mainContent}
				{accountDoesNotExist}
				{hasWallet}
				
			<div id="footer" style={{display: 'block'}} >	
				<span id="footerbg" style={{display: 'block'}} className={styles.footerbg}> </span>
				<a style={{display: 'block'}} href="https://t.me/qoritele" target="_blank" rel="noopener noreferrer" >
						<span className={styles.teleIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://discordapp.com/users/427110583079272479" target="_blank" rel="noopener noreferrer" >
						<span className={styles.dcIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://github.com/faresapn15" target="_blank" rel="noopener noreferrer" >
						<span className={styles.gitIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://twitter.com/NCrazyBoyz" target="_blank" rel="noopener noreferrer" >
						<span className={styles.fbIcon}> </span>
					</a>
					
				<span id="blank" style={{visibility: 'hidden'}} className={styles.blank}> </span>
			</div>
					
			</div>
		</main>
		
	<footer className={styles.footer}>
		</footer>


	</div>
  );
}
