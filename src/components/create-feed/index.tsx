import {CreateFeedForm} from "./CreatFrom";

export const CreateFeedPage: React.FC = () => {
  return(
    <div className='w-full flex flex-col'>

      {/*Header Panel*/}
      <div className='pt-4 w-[800px]'>
        <div className='flex items-center w-full'>
          <div className='ml-3 flex-grow flex gap-x-3 items-center'>
            {/* Header */}
            <div className='font-medium text-lg text-unique-600'>{"Feed Some News"}</div>
          </div>
        </div>
      </div>


      <div className='mt-4 border-b border-b-neutral-100 font-semibold w-full'></div>
      <div className="items-center justify-center">

        {/* content */}
        <div className='max-h-[calc(100vh_-_128px)] overflow-auto w-full flex justify-center'>
          <div className='w-[900px]'>
            <div className='p-5 rounded-lg border mt-6 shadow-md'>
              <CreateFeedForm/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}