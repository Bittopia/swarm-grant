import { type FC, useState } from 'react'
import BaseTemplate from '@/layouts/BaseTemplate'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { sentenceCase } from 'change-case'
import useAuthCredentials from '@/store/AuthCredentials'
import CourseService from '@/services/CourseService'

const CourseSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  isPrivate: yup.boolean().optional()
})

export const NewCourse: FC = () => {
  const { web3Address } = useAuthCredentials()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isPrivate: false
    },
    validationSchema: CourseSchema,
    onSubmit: values => {
      setIsLoading(true)
      CourseService.create({ ...values, ownerAddress: web3Address })
        .then(reference => {
          console.log(reference)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        })
    }
  })

  return (
    <BaseTemplate>
      <h1 className={'mb-8 text-2xl font-bold'}>Create course</h1>
      <form onSubmit={formik.handleSubmit} className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <label htmlFor={'title'} className={'text-sm font-bold'}>
            Title
          </label>
          <input
            value={formik.values.title}
            onChange={formik.handleChange}
            type={'text'}
            id={'title'}
            className={`rounded-md border border-gray-500 bg-transparent p-2 focus:border-primary focus:outline-none ${
              formik.errors.title != null && formik.touched.title === true
                ? 'border-red-500'
                : ''
            }`}
          />
          {formik.errors.title != null && formik.touched.title === true && (
            <div
              className={'w-fit rounded-lg bg-red-500 p-2 text-xs text-white'}
            >
              {sentenceCase(formik.errors.title)}
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
          disabled={formik.isSubmitting || isLoading}
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
