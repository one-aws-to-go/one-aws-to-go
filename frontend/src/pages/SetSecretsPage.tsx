import { useLocation, useNavigate, useParams } from "react-router-dom"

import { ForkAwsSecretArgs } from "../models/ForkAwsSecretArgs"
import NavBar from "../components/NavBar"
import aws from '../../img/aws.png'
import { useSetSecrets } from "../hooks/useSetSecrets"
import { useState } from "react"

export interface SetSecretsPageProps {
  provider: string
}

const SetSecretsPage = () => {
  const { id } = useParams()
  const { provider } = useLocation().state as SetSecretsPageProps

  const navigate = useNavigate()

  const [secrets, setSecrets] = useState<ForkAwsSecretArgs>({
    awsAccessKey: '',
    awsSecretKey: '',
    awsDefaultRegion: 'eu-west-1'
  })

  const mutation = useSetSecrets()

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      forkId: id,
      secrets: secrets
    })
  };

  return (
    <div className='flex flex-col bg-surface h-screen'>
      <NavBar />
      <div className="flex flex-col  h-screen justify-center">
        <div className="flex flex-col space-y-2 items-center mx-auto max-w-7xl w-full">

          {/* HEADER */}
          <div className="flex flex-row items-center">
            <img
              className='h-16 px-2'
              src={`../../assets/${provider}.png`}
              alt={'logoImage'}
            />
            <div className="text-xl font-bold text-primary">Secrets</div>
          </div>

          {/* Details block */}
          <div className="flex flex-col space-y-4 m-4">
            <div
              className="grid grid-flow-row grid-cols-1 auto-rows-max gap-2">
              <div>
                <div className="text-white text-xs font-bold">Default region (*)</div>
                <select
                  value={secrets.awsDefaultRegion}
                  onChange={(event) => setSecrets({ ...secrets, awsDefaultRegion: event.target.value })}
                  className="form-select mt-1  w-full bg-primaryContainer text-white   focus:border-primary focus:ring-0 placeholder:text-sm">
                  <option value="eu-west-1">eu-west-1</option>
                  <option value="eu-west-2">eu-west-2</option>
                  <option value="us-west-1">us-west-1</option>
                  <option value="us-west-2">us-west-2</option>
                  <option value="us-east-1">us-east-1</option>
                  <option value="us-east-2">us-east-2</option>
                </select>
              </div>

              <div>
                <div className="text-white text-xs font-bold">Access key (*)</div>
                <input
                  className="mt-1 block w-full bg-primaryContainer text-white focus:border-primary focus:ring-0 placeholder:text-sm"
                  type='text'
                  placeholder='Access key'
                  onChange={(event) => setSecrets({ ...secrets, awsAccessKey: event.target.value })}
                  value={secrets.awsAccessKey} />
              </div>

              <div>
                <div className="text-white text-xs font-bold">Secret key (*)</div>
                <input
                  className="mt-1 block w-full bg-primaryContainer text-white focus:border-primary focus:ring-0 placeholder:text-sm"
                  type='password'
                  placeholder='Secret key'
                  onChange={(event) => setSecrets({ ...secrets, awsSecretKey: event.target.value })}
                  value={secrets.awsSecretKey} />
              </div>
            </div>

            {/* Button grid */}
            <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-1 gap-2">
              <button
                onClick={submitForm}
                className="bg-primaryContainer text-white p-2 hover:bg-primaryContainer/60 hover:text-primary">
                <div className="flex flex-row space-x-2 justify-center items-center">
                  {mutation.isLoading ? (
                    <div role="status">
                      <svg aria-hidden="true" className="w-6 h-6 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-success">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  )}
                  <div className="text-sm font-bold">Setup</div>
                </div>
              </button>


              <button onClick={() => {
                navigate(-1)
              }} className="bg-primaryContainer  p-2 hover:bg-primaryContainer/60 text-white hover:text-primary">
                <div className="flex flex-row space-x-2 justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-error">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>

                  <div className="text-sm  font-bold">Back</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SetSecretsPage