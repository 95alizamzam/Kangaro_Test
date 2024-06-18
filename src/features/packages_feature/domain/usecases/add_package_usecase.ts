import showToast from "../../../../core/app/toast_config";
import { PackageLocalDataSource } from "../../data/local_data_source/package_local_data_source";
import { PackageModel } from "../../data/models/package_model";

export class AddPackageUseCase {

    private localDataSource!: PackageLocalDataSource;
    constructor() {
        this.localDataSource = new PackageLocalDataSource();
    }

    async call(probs: { item: PackageModel }): Promise<boolean> {
        let result: boolean = false;
        const response = await this.localDataSource.addPackage(probs.item);
        if (response.data != null) {
            showToast({
                title: "Adding New Package",
                message: `Your Package ${probs.item.packageName} was added successfully`,
            });
            result = true;
        } else if (response.exception != null) {
            showToast({
                title: "Adding New Package",
                message: `${response.exception.message}`,
                type: 'error',
            });
            result = false;
        }

        return result;
    }
}