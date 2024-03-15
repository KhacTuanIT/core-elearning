export const adminModePage = {
  view: 'VIEW',
  edit: 'EDIT',
  create: 'CREATE',
  viewDetail: 'VIEW_DETAIL',
}

export const handleValidateData = (
  mode,
  updateItem,
  validateFields,
  callback,
) => {
  let errors = {}
  if (updateItem === null || updateItem === undefined) return true
  for (const [key, value] of Object.entries(updateItem)) {
    if (
      validateFields &&
      validateFields[mode.toLowerCase()]?.includes(key) &&
      (value === null || value === undefined || value === '')
    ) {
      errors[key] = `${[key]} is required`
    }
  }

  if (callback && typeof callback === 'function') {
    callback(errors)
  }

  if (Object.keys(errors).length > 0) {
    return false
  }
  return true
}

export const validateCategoryFields = {
  create: ['categoryName'],
  edit: ['id', 'categoryName'],
}

export const validateQuestionFields = {
  create: ['categoryId', 'questionText'],
  edit: ['id', 'categoryId', 'questionText'],
}

export const validateAnswerFields = {
  create: ['questionId', 'answerText', 'shortAnswer'],
  edit: ['id', 'questionId', 'answerText', 'shortAnswer'],
}
