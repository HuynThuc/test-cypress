import { handleFilterParams } from '@/app/[locale]/shared/utils';

import { apiClient } from '../../../shared/api';
import {
  HelenShortSpeakingCategorySchema,
  HelenShortSpeakingSchema,
  HelenShortSpeakingTagSchema,
} from '../schema';
import {
  IGetAllHelenShortSpeakingCategoryRequest,
  IGetAllHelenShortSpeakingRequest,
  IGetAllHelenShortSpeakingTagRequest,
  IHelenShortSpeaking,
  IHelenShortSpeakingCategory,
  IHelenShortSpeakingTag,
  IListHelenShortSpeakingCategoryResponse,
  IListHelenShortSpeakingResponse,
  IListHelenShortSpeakingTagResponse,
} from '../types';
import { HELPER_API_ROUTES } from '../utils';

async function createHelenShortSpeaking(req: HelenShortSpeakingSchema) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SHORT_SPEAKING, req);
}

async function getAllHelenShortSpeaking(
  req: IGetAllHelenShortSpeakingRequest,
): Promise<IListHelenShortSpeakingResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_HELEN_SHORT_SPEAKING,
    handleFilterParams(req),
  );
}

async function updateHelenShortSpeaking(req: HelenShortSpeakingSchema) {
  return apiClient.put(
    `${HELPER_API_ROUTES.HELEN_SHORT_SPEAKING}/${req.id}`,
    req,
  );
}

async function deleteHelenShortSpeaking(id: string) {
  return apiClient.delete(`${HELPER_API_ROUTES.HELEN_SHORT_SPEAKING}/${id}`);
}

async function updateActiveHelenShortSpeaking(id: string) {
  return apiClient.put(
    `${HELPER_API_ROUTES.HELEN_SHORT_SPEAKING}/active/${id}`,
    {},
  );
}

async function updateInactiveHelenShortSpeaking(id: string) {
  return apiClient.put(
    `${HELPER_API_ROUTES.HELEN_SHORT_SPEAKING}/inactive/${id}`,
    {},
  );
}

function mapInterfaceToFormSchema(
  req: IHelenShortSpeaking,
): HelenShortSpeakingSchema {
  return {
    title: req.title,
    targetAudience: req.targetAudience,
    category: req.category,
    tags: req.tags,
    imageUrl: req.imageUrl,
    scriptUrl: req.scriptUrl,
    mp3Url: req.mp3Url,
    refUrl: req.refUrl,

    id: req.id,
  };
}

// Helen Speaking Category
async function createHelenShortSpeakingCategory(
  req: HelenShortSpeakingCategorySchema,
) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SHORT_SPEAKING_CATEGORY, req);
}

async function getAllHelenShortSpeakingCategory(
  req: IGetAllHelenShortSpeakingCategoryRequest,
): Promise<IListHelenShortSpeakingCategoryResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_HELEN_SHORT_SPEAKING_CATEGORY,
    handleFilterParams(req),
  );
}

async function deleteHelenShortSpeakingCategory(id: string) {
  return apiClient.delete(
    `${HELPER_API_ROUTES.HELEN_SHORT_SPEAKING_CATEGORY}/${id}`,
  );
}
function mapInterfaceToFormCategorySchema(
  req: IHelenShortSpeakingCategory,
): HelenShortSpeakingCategorySchema {
  return {
    title: req.title,
    value: req.value,
    color: req.color,
    iconUrl: req.iconUrl,
    id: req.id,
  };
}

// Helen Short Speaking Tag
async function createHelenShortSpeakingTag(req: HelenShortSpeakingTagSchema) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SHORT_SPEAKING_TAG, req);
}

async function getAllHelenShortSpeakingTag(
  req: IGetAllHelenShortSpeakingTagRequest,
): Promise<IListHelenShortSpeakingTagResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_HELEN_SHORT_SPEAKING_TAG,
    handleFilterParams(req),
  );
}

async function deleteHelenShortSpeakingTag(id: string) {
  return apiClient.delete(
    `${HELPER_API_ROUTES.HELEN_SHORT_SPEAKING_TAG}/${id}`,
  );
}

function mapInterfaceToFormTagSchema(
  req: IHelenShortSpeakingTag,
): HelenShortSpeakingTagSchema {
  return {
    title: req.title,
    value: req.value,
    color: req.color,
    iconUrl: req.iconUrl,
    id: req.id,
  };
}

export const helenShortSpeakingService = {
  // Helen Short Speaking
  createHelenShortSpeaking,
  getAllHelenShortSpeaking,
  updateHelenShortSpeaking,
  deleteHelenShortSpeaking,
  updateActiveHelenShortSpeaking,
  updateInactiveHelenShortSpeaking,
  mapInterfaceToFormSchema,

  // Helen Short Speaking Category
  createHelenShortSpeakingCategory,
  getAllHelenShortSpeakingCategory,
  deleteHelenShortSpeakingCategory,
  mapInterfaceToFormCategorySchema,

  // Helen Short Speaking Tag
  createHelenShortSpeakingTag,
  getAllHelenShortSpeakingTag,
  deleteHelenShortSpeakingTag,
  mapInterfaceToFormTagSchema,
};
