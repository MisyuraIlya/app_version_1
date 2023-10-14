import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import SweetAlert from 'sweetalert2';
import moment from 'moment-timezone';

const AgentActions = params => {
	let { lang,props } = params;

	const setOrderMode = (val) => {
		if(params.props.isHeader){
			params.props.closeAgentActionsPop();
		}
		if(val!=4){

			if(localStorage.products){

				SweetAlert({
				title: 'האם אתה בטוח?',
				text: 'כל המוצרים בעגת הקניות יימחקו',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#22b09a',
				cancelButtonColor: '#d80028',
				confirmButtonText: 'אשר',
				cancelButtonText: 'בטל'
				}).then(function (res) {
					if (res.value) {
						if(!params.props.isHeader){
							params.props.simpleClearCart();
						}else{
							params.props.props.simpleClearCart();
						}
						setOrderModeFinal(val);
					}
				}.bind(this)).catch(SweetAlert.noop);
			}else{
				setOrderModeFinal(val);
			}
			

		}else{

		}
		
	}

	const setOrderModeFinal = (val) => {
		localStorage.setItem('selectedMode', val);
		//localStorage.setItem('returnSelectedMode', this.state.returnSelectedMode);
		//this.props.closeAgentOrderPop();
		if(!params.props.isHeader){
			params.props.setSelectedMode();
			params.props.history.push('/category-page/'+ lang);

		}else{
			params.props.props.setSelectedMode();
			params.props.props.history.push('/category-page/'+ lang);

		}
	}
	const setVisit = async() =>{
		const agentId = JSON.parse(localStorage.agent).Id;

		let currDate = new Date();
		let fromTime = currDate.getHours() + ':' + currDate.getMinutes();
		let toTime = (currDate.getHours()+1) + ':' + currDate.getMinutes();
		let text = 'ביקור - ' + JSON.parse(localStorage.user).Name;
		
		let val = {
		  agentId: agentId,
		  date: moment(currDate).format('YYYY-MM-DD'),
		  hourFrom: fromTime,
		  hourTo: toTime,
		  missions: text,
		  completed:1,
		  completedDate:1
		}
	
		const valAjax = {
		  point: 'agents_app/index',
		  classPoint:'Objectives',
		  funcName: 'CreateObjective',
		  val:val
		};
		try {
			let data;
			if(!params.props.isHeader){
				data = await params.props.ajax(valAjax);
			}else{
				data = await params.props.props.ajax(valAjax);
			}
		  
		  if(data.status == 'success'){
			if(params.props.isHeader){
				params.props.closeAgentActionsPop();
			}
			SweetAlert({
				title: 'משימה נרשמה בהצלחה',
				text: 'תוכל לצפות באזור הביקורים/משימות',
				type: 'success',
				timer: 3000,
				showConfirmButton: false,
			}).then(function () {
				
			}.bind(this)).catch(SweetAlert.noop);
		  } else {
			SweetAlert({
				title: 'שגיאה',
				text: 'נסה שנית',
				type: 'error',
				timer: 3000,
				showConfirmButton: false,
			}).then(function () {

			}.bind(this)).catch(SweetAlert.noop);
		  }
		} catch (error) {
		  console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });

		} finally {

		}

	}

	return(
		
		<div className="agent-actions-main-cont">
			<div className="agent-actions-sub-cont">
				<div className="Profile-slide-menu-cont">
					<h1>{lang=='he' ? 'פעולות' : ''}</h1>
					<div className='btns-cont'>
						<div className="Profile-slide-sub" onClick={()=> setOrderMode(1)}>
							<div className="Profile-slide-box">
							<span className="material-symbols-outlined search-img">{'list_alt'}</span>
							<h2>{'הזמנה'}</h2>
							</div>
						</div>
						<div className="Profile-slide-sub" onClick={()=> setOrderMode(3)}>
							<div className="Profile-slide-box">
							<span className="material-symbols-outlined search-img">{'history'}</span>
							<h2>{'החזרה'}</h2>
							</div>
						</div>
						<div className="Profile-slide-sub" onClick={()=> setOrderMode(2)}>
							<div className="Profile-slide-box">
							<span className="material-symbols-outlined search-img">{'request_quote'}</span>
							<h2>{'ה.מחיר'}</h2>
							</div>
						</div>
						<div className="Profile-slide-sub" onClick={()=> setVisit()}>
							<div className="Profile-slide-box">
							<span className="material-symbols-outlined search-img">{'tour'}</span>
							<h2>{'ביקור'}</h2>
							</div>
						</div>
						{/*
						<div className="Profile-slide-sub" onClick={()=> setOrderMode(4)}>
							<div className="Profile-slide-box">
							<span className="material-symbols-outlined search-img">{'quiz'}</span>
							<h2>{'שאלון'}</h2>
							</div>
						</div>
						*/}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AgentActions;
