import os
import glob
import pandas as pd    

extension = 'csv'
#all_filenames = [i for i in glob.glob('*.{}'.format(extension))}
df1 = pd.read_csv("../data/01_hex_variables_non_gov_regardless_of_reporting_frequency_20210209.csv")
df2 = pd.read_csv("../data/02_hex_variables_non_gov_and_unsure_regardless_of_reporting_frequency_20210209.csv")
result = df1.merge(df2, on='HEX_600')
result.to_csv("result.csv")

'''def col_rename(self, str file_num):
    columns={
        'HEX_weighted_average_distance': '{}_HEX_weighted_average_distance',
        'HEX_weighted_mean_home_distance': '{}_HEX_weighted_mean_home_distance',
        'HEX_weighted_max_home_distance': '{}_HEX_weighted_max_home_distance',
        'HEX_weighted_median_home_distance': '{}_HEX_weighted_median_home_distance',
        'HEX_weighted_radius_of_gyration': '{}_HEX_weighted_radius_of_gyration',
        'HEX_weighted_num_reporting_2015': '{}_HEX_weighted_num_reporting_2015',
        'HEX_weighted_HEX_coverage': '{}_HEX_weighted_HEX_coverage',
        'HEX_weighted_subject_coverage': '{}_HEX_weighted_subject_coverage',
        'HEX_weighted_subject_hhi': '{}_HEX_weighted_subject_hhi',
        'HEX_total_reporting': '{}_HEX_total_reporting',
        'HEX_total_user': '{}_HEX_total_user'}
    self = self.rename(columns = columns, inplace=True)
'''
