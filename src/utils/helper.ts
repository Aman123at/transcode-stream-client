export const convertFieldErrorsToString = (
    errObj: Record<string, any>
  ): Record<string, any> => {
    let newObj: Record<string, any> = {};
    let key: string;
    for (key in errObj) {
      newObj[key] = errObj[key][0];
    }
    return newObj;
  };

export const getStatusColor = (status:string)=>{
  switch(status){
    case 'active':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-orange-500';
    case 'queued':
      return 'bg-yellow-500';
    case 'error':
      return 'bg-red-500';

    default:
      return "bg-gray-500"
  }
}


export const truncateText = (text:string,char:number):string=>{
  return  text.length<=char ? text : text.slice(0,char)+"..."
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours > 0 ? `${hours}:` : '';
  const minutesString = hours > 0 ? `${minutes.toString().padStart(2, '0')}:` : `${minutes}:`;
  const secondsString = remainingSeconds.toString().padStart(2, '0');

  return `${hoursString}${minutesString}${secondsString.slice(0,2)}`;
}


