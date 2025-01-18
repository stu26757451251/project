type Name = Name of string
type Description = Description of string
type Status = 'Todo' | 'InProgress' | 'Waiting' | 'Done'
type DueDate = DueDate of date
type Priority = Priority of integer
type Frequency = 'Daily' | 'Weekly' | 'Monthly'
type Emergency = 'NotEmergency' | 'Emergency'
type Important = 'NotImportant' | 'Important'

type Task = Name * Description * Status * 
DueDate optional * Priority optional * Frequency optional * Frequency optional * Emergency optional * Important optional

type getTasks = User -> Result<GetTasksError , Task list>



api -> data
    -> error -> 
            // AxiosError -> unexpected Error , tag invalid error, api known error -> GetTasksErro