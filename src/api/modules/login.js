
import { dPost } from '../../utils/request';
/**
 * 登录
 * @param {*} parm
 */

const user = params => dPost('/sys/lg/login', {}, { params, carrySessionToken: false });
export default { user };
