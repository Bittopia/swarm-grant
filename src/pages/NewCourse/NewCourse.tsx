import { type FC } from 'react'
import BaseTemplate from '@/layouts/BaseTemplate'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { sentenceCase } from 'change-case'
import useSocieties from '@/store/societies'

const CourseSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  isPrivate: yup.boolean().optional()
})

export const NewCourse: FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      fieldOfStudy: '',
      isPrivate: false
    },
    validationSchema: CourseSchema,
    onSubmit: values => {
      console.log(values)
    }
  })

  const { societies } = useSocieties()
  return (
    <BaseTemplate>
      <h1 className={'mb-8 text-2xl font-bold'}>Create course</h1>
      <form onSubmit={formik.handleSubmit} className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <label htmlFor={'name'} className={'text-sm font-bold'}>
            Name
          </label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            type={'text'}
            id={'name'}
            className={`rounded-md border border-gray-500 bg-transparent p-2 focus:border-primary focus:outline-none ${
              formik.errors.name != null && formik.touched.name === true
                ? 'border-red-500'
                : ''
            }`}
          />
          {formik.errors.name != null && formik.touched.name === true && (
            <div
              className={'w-fit rounded-lg bg-red-500 p-2 text-xs text-white'}
            >
              {sentenceCase(formik.errors.name)}
            </div>
          )}
        </div>
        <div className={'flex flex-col gap-2'}>
          <label htmlFor={'name'} className={'text-sm font-bold'}>
            Field of study
          </label>
          <select
            value={formik.values.fieldOfStudy}
            onChange={formik.handleChange}
            id={'fieldOfStudy'}
            placeholder={'Select field of study'}
            className={`rounded-md border border-gray-500 bg-transparent p-2 focus:border-primary focus:outline-none ${
              formik.errors.name != null && formik.touched.name === true
                ? 'border-red-500'
                : ''
            }`}
          >
            {Object.keys(societies).map(societyKeys => (
              <option key={societyKeys} value={societyKeys}>
                {societies[societyKeys].name}
              </option>
            ))}
          </select>
          {formik.errors.name != null && formik.touched.name === true && (
            <div
              className={'w-fit rounded-lg bg-red-500 p-2 text-xs text-white'}
            >
              {sentenceCase(formik.errors.name)}
            </div>
          )}
        </div>
        <div className={'flex flex-col gap-2'}>
          <label htmlFor={'name'} className={'text-sm font-bold'}>
            Description
          </label>
          <textarea
            value={formik.values.description}
            onChange={formik.handleChange}
            id={'description'}
            rows={5}
            className={`rounded-md border border-gray-500 bg-transparent p-2 focus:border-primary focus:outline-none ${
              formik.errors.description != null &&
              formik.touched.description === true
                ? 'border-red-500'
                : ''
            }`}
          />
          {formik.errors.description != null &&
            formik.touched.description === true && (
              <div
                className={'w-fit rounded-lg bg-red-500 p-2 text-xs text-white'}
              >
                {sentenceCase(formik.errors.description)}
              </div>
          )}
        </div>
        <div className={'flex flex-col gap-2'}>
          <label htmlFor={'isPrivate'} className={'text-sm font-bold'}>
            <input
              id={'isPrivate'}
              checked={formik.values.isPrivate}
              onChange={formik.handleChange}
              type={'checkbox'}
              className={'mr-2'}
            />
            Is private?
          </label>
        </div>
        <button
          type={'submit'}
          disabled={formik.isSubmitting}
          className={
            'rounded-md bg-primary p-2 text-white transition-colors hover:bg-blue-400'
          }
        >
          {formik.isSubmitting ? 'Creating course...' : 'Create course'}
        </button>
      </form>
    </BaseTemplate>
  )
}
