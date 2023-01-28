import React,{memo} from 'react'
import { Triangle } from 'react-loader-spinner';

const Loading = () => {
  return (
   <Triangle
        height="300"
        width="300"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
    /> 
  )
}

export default memo(Loading)
