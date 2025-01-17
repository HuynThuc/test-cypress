import { handleFilterParams } from '../../../shared/utils';
import { apiClient } from '../../../shared/api';
import {
  HelenSpeakingSchema,
  HelenSpeakingTagSchema,
  HelenSpeakingCategorySchema,
} from '../schema';
import {
  IHelenSpeaking,
  IListHelenSpeakingResponse,
  IListHelenSpeakingTagResponse,
  IListHelenSpeakingCategoryResponse,
  IHelenSpeakingCategory,
  IHelenSpeakingTag,
  IGetAllHelenSpeakingRequest,
  IGetAllHelenSpeakingCategoryRequest,
  IGetAllHelenSpeakingTagRequest,
} from '../types';
import { HELPER_API_ROUTES } from '../utils';

async function createHelenSpeaking(req: HelenSpeakingSchema) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SPEAKING, req);
}

async function getAllHelenSpeaking(
  req: IGetAllHelenSpeakingRequest,
): Promise<IListHelenSpeakingResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_HELEN_SPEAKING,
    handleFilterParams(req),
  );
}

async function updateHelenSpeaking(req: HelenSpeakingSchema) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SPEAKING, req);
}

async function deleteHelenSpeaking(id: string) {
  return apiClient.delete(`${HELPER_API_ROUTES.HELEN_SPEAKING}/${id}`);
}

async function updateActiveHelenSpeaking(id: string) {
  return apiClient.put(`${HELPER_API_ROUTES.HELEN_SPEAKING}/active/${id}`, {});
}

async function updateInactiveHelenSpeaking(id: string) {
  return apiClient.put(
    `${HELPER_API_ROUTES.HELEN_SPEAKING}/inactive/${id}`,
    {},
  );
}

function mapInterfaceToFormSchema(req: IHelenSpeaking): HelenSpeakingSchema {
  return {
    targetAudience: req.targetAudience,
    category: req.category,
    youtubeUrl: req.youtubeUrl,
    thumbnailUrl: req.thumbnailUrl,
    blurThumbnailUrl: req.blurThumbnailUrl,
    tags: req.tags,
    title: req.title,
    scriptUrl: req.scriptUrl,
    mode: req.mode,

    id: req.id,
  };
}

// Helen Speaking Category
async function createHelenSpeakingCategory(req: HelenSpeakingCategorySchema) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SPEAKING_CATEGORY, req);
}

async function getAllHelenSpeakingCategory(
  req: IGetAllHelenSpeakingCategoryRequest,
): Promise<IListHelenSpeakingCategoryResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_HELEN_SPEAKING_CATEGORY,
    handleFilterParams(req),
  );
}

async function deleteHelenSpeakingCategory(id: string) {
  return apiClient.delete(`${HELPER_API_ROUTES.HELEN_SPEAKING_CATEGORY}/${id}`);
}
function mapInterfaceToFormCategorySchema(
  req: IHelenSpeakingCategory,
): HelenSpeakingCategorySchema {
  return {
    title: req.title,
    value: req.value,
    color: req.color,
    iconUrl: req.iconUrl,
    id: req.id,
  };
}

// Helen Speaking Tag
async function createHelenSpeakingTag(req: HelenSpeakingTagSchema) {
  return apiClient.post(HELPER_API_ROUTES.HELEN_SPEAKING_TAG, req);
}

async function getAllHelenSpeakingTag(
  req: IGetAllHelenSpeakingTagRequest,
): Promise<IListHelenSpeakingTagResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_HELEN_SPEAKING_TAG,
    handleFilterParams(req),
  );
}

async function deleteHelenSpeakingTag(id: string) {
  return apiClient.delete(`${HELPER_API_ROUTES.HELEN_SPEAKING_TAG}/${id}`);
}

function mapInterfaceToFormTagSchema(
  req: IHelenSpeakingTag,
): HelenSpeakingTagSchema {
  return {
    title: req.title,
    value: req.value,
    color: req.color,
    iconUrl: req.iconUrl,
    id: req.id,
  };
}

export const helenSpeakingService = {
  //Helen Speaking
  createHelenSpeaking,
  getAllHelenSpeaking,
  updateHelenSpeaking,
  deleteHelenSpeaking,
  updateActiveHelenSpeaking,
  updateInactiveHelenSpeaking,
  mapInterfaceToFormSchema,

  //Helen Speaking Category
  createHelenSpeakingCategory,
  getAllHelenSpeakingCategory,
  deleteHelenSpeakingCategory,
  mapInterfaceToFormCategorySchema,

  //Helen Speaking Tag
  createHelenSpeakingTag,
  getAllHelenSpeakingTag,
  deleteHelenSpeakingTag,
  mapInterfaceToFormTagSchema,
};
