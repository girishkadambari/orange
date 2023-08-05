import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ObjectSchema} from "yup";
import {FeedStatus} from "../constants/FeedStatus";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Select, Switch, TextInput} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {useCallback, useMemo, useState} from "react";
import {Content} from "@tiptap/react";
import {ContentEditor} from "./rich-text-editor";

export type FormData = {
  fromDate:Date;
  expireDate:Date;
  language: string;
  label:string;
  title:string;
  content:Content;
  insertLinkText:string;
  insertLinkURL:string;
  inApp:boolean;
  standalon:boolean;
  push:boolean;
  email:boolean;
  topbar:boolean;
  popup:boolean;
  snippet:boolean;
  tooltip:boolean;
  segmentFilters:string;//comma seprated
  enableComments:boolean;
  enableSocialMedia:boolean;
  enableReaction:boolean;
  pinToTop:boolean;
  openLinkInNewTab:boolean;
  status:FeedStatus;
};

const schema:ObjectSchema<any> = yup
  .object()
  .shape({
    title:yup.string().trim(),
    insertLinkText: yup.string(),
    insertLinkURL: yup.string().test({
      name: 'conditionalURL',
      test: function (value) {
        const { insertLinkText } = this.parent;
        if (insertLinkText) {
          return yup.string().required().url().isValidSync(value);
        }
        return true;
      },
      message: 'URL is required when URL text is entered',
    }),
  })
  .required();


export const CreateFeedForm: React.FC = () => {

  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
    watch,
  } = useForm<FormData>({
    resolver:yupResolver(schema),
    defaultValues: {
      language: "English",
      label:"New",
      title:"",
      content:"",
      insertLinkText:"",
      insertLinkURL:"",
      inApp:true,
      standalon:true,
      push:false,
      email:false,
      topbar:false,
      popup:false,
      snippet:false,
      tooltip:false,
      segmentFilters:"",//comma seprated
      enableComments:false,
      enableSocialMedia:true,
      enableReaction:false,
      pinToTop:false,
      openLinkInNewTab:true,
      status:FeedStatus.PUBLISHED,
    }
  });

  const _values = useMemo(() => getValues, [getValues]);
  const values = _values();

  const [data, setData] = useState([
    { value: 'New', label: 'New' },
    { value: 'Improvement', label: 'Improvement' },
    { value: 'Fix', label: 'Fix' },
    { value: 'Coming Soon', label: 'Coming Soon' },
    { value: 'Announcement', label: 'Announcement' },
  ]);

  const setFormValue = (fieldId: any, fieldValue: any) => {
    setValue(fieldId, fieldValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };


  const onSubmit = useCallback(async(data: FormData) => {
    console.log(data);
  },[])

  const handleSaveAsDraft=(data:FormData) =>{
    setValue("status",FeedStatus.DRAFT)
    onSubmit(data);
  }

  return(
    <form className="w-[100%]" >
      <div className="flex flex-col p-5 space-y-4">
        <div className="flex flex-row justify-between">
          <div className="flex space-x-4 ">
            <DateInput
              valueFormat="YYYY/MM/DD"
              placeholder="From input"
              size={'md'}
              maw={400}
              mx="auto"
            />
            <DateInput
              valueFormat="YYYY/MM/DD"
              placeholder="Expire input"
              maw={400}
              size={'md'}
              mx="auto"
            />
          </div>
          <div>
            <Select
              onChange={(value: string) => setFormValue("label", value)}
              size={'md'}
              value={watch('label')}
              data={data}
              nothingFound="Nothing found"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setData((current) => [...current, item]);
                return item;
              }}

            />
          </div>
        </div>


        <TextInput
          onChange={(event) => setFormValue("title",event.currentTarget.value)}
          value={watch('title')}
          size={'md'}
          placeholder="Insert title"
          error={errors?.title?.message || ""}
        />

        <ContentEditor errors={errors} watch={watch} values={values} setValues={setValue}/>

        <TextInput
          onChange={(event) => setFormValue("insertLinkText",event.currentTarget.value)}
          value={watch('insertLinkText')}
          size={'md'}
          placeholder="Insert Link text(optional)"
          error={errors?.insertLinkText?.message || ""}
        />

        <TextInput
          onChange={(event) => setFormValue("insertLinkURL",event.currentTarget.value)}
          value={watch('insertLinkURL')}
          error={errors?.insertLinkURL?.message || ""}
          size={'md'}
          placeholder="Insert Link URL"
        />

        <TextInput
          onChange={(event) => setFormValue("segmentFilters",event.currentTarget.value)}
          value={watch('segmentFilters')}
          size={'md'}
          placeholder="Segment filters (multiple filters can be separated by ;semicolons;)"
        />

        <div className="grid grid-cols-2 gap-4">
          <Switch
            onChange={(event) => setFormValue("enableComments",event.currentTarget.checked)}
            checked={watch('enableComments')}
            label="Enable Comments"
          />
          <Switch
            onChange={(event) => setFormValue("enableSocialMedia",event.currentTarget.checked)}
            checked={watch('enableSocialMedia')}
            label="Enable Social media sharing"
          />
          <Switch
            onChange={(event) => setFormValue("enableReaction",event.currentTarget.checked)}
            checked={watch('enableReaction')}
            label="Enable reactions"
          />
          <Switch
            onChange={(event) => setFormValue("pinToTop",event.currentTarget.checked)}
            checked={watch('pinToTop')}
            label="Pin to top of feed"
          />
          <Switch
            onChange={(event) => setFormValue("openLinkInNewTab",event.currentTarget.checked)}
            checked={watch('openLinkInNewTab')}
            label="Open links in new tab"
          />

        </div>


        <div className="flex flex-row justify-end space-x-4 mt-4">
          <Button  variant="outline">
            PREVIEW
          </Button>
          <Button variant="outline" onClick={()=>{handleSubmit(handleSaveAsDraft)}}>
            SAVE AS  DRAFT
          </Button>
          <Button  variant="outline"  onClick = {handleSubmit(onSubmit)}>
            SAVE AND PUBLISH
          </Button>
        </div>
      </div>
    </form>

  )
}