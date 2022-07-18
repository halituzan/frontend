import React from 'react'
import MerchantInfo from './settings/MerchantInfo'
import UserInfo from './settings/UserInfo'

export default function SettingForms() {


  return (
    <div className='d-flex flex-column'>
        <MerchantInfo/>
        <UserInfo/>
    </div>
  )
}
